class App {
    constructor() {};

    static BASE_URL = "https://spaceship-builder.herokuapp.com/";

    static objectToInstance(object, klass) {
        let instance = new klass();
        Object.keys(object).forEach(function(key) {instance[key] = object[key];});
        return instance;
    };

    static makeSpaceships(shipData) {
        Spaceship.list = [];
        for (let object of shipData) {App.makeSpaceship(object)}
        App.listSpaceships();
    };

    static makeSpaceship(object, ship = new Spaceship()) {
        Object.keys(object).forEach(function(key) {
            if (object[key] != null && object[key].constructor != Array) {
                ship[key] = object[key]
        }});
        ship.hulls = [];
        ship.feature_ids = [];
        ship.rule_ids = [];
        object.hulls.forEach(function(hull) {ship.hulls_attributes.push(App.makeHull(hull))});
        object.features.forEach(function(feature) {ship.feature_ids.push(feature.id)});
        object.switches.forEach(function(rule) {ship.rule_ids.push(rule.id)});
        Spaceship.list.push(ship);
        return ship;
    };

    static makeHull(object) {
        let hull = new Hull();
        Object.keys(object).forEach(function(key) {
            if (object[key] != null && object[key].constructor != Array) {
                hull[key] = object[key]
        }});
        object.placements.forEach(function(placement) {hull.placements_attributes.push(App.makePlacement(placement))});
        Hull.list.push(hull);
        return hull;

    };

    static makePlacement(object) {
        let placement = new Placement();
        Object.keys(object).forEach(function(key) {
            if (object[key] != null && object[key].constructor != Array) {
                placement[key] = object[key]
        }});
        object.weapon_mounts.forEach(function(weapon_mount) {placement.weapon_mounts_attributes.push(App.makeWeaponMount(weapon_mount))});
        object.habitat_spaces.forEach(function(habitat_space) {placement.habitat_spaces_attributes.push(App.makeHabitatSpace(habitat_space))});
        Placement.list.push(placement);
        return placement;
    };

    static makeHabitatSpace(object) {
        let habitatSpace = App.objectToInstance(object, HabitatSpace);
        HabitatSpace.list.push(habitatSpace)
        return habitatSpace;
    };

    static makeWeaponMount(object) {
        let weaponMount = App.objectToInstance(object, WeaponMount);
        WeaponMount.list.push(weaponMount);
        return weaponMount;
    };

    static loadSystems() {
        fetch(`${App.BASE_URL}/systems`)
        .then(resp => resp.json())
        .then(json => App.parseSystems(json));
    };

    static loadHabitats() {
        fetch(`${App.BASE_URL}/habitats`)
        .then(resp => resp.json())
        .then(json => App.parseHabitats(json));
    };

    static loadWeapons() {
        fetch(`${App.BASE_URL}/weapons`)
        .then(resp => resp.json())
        .then(json => App.parseWeapons(json));
    };

    static loadFeatures() {
        fetch(`${App.BASE_URL}/features`)
        .then(resp => resp.json())
        .then(json => App.parseFeatures(json));
    };

    static loadRules() {
        fetch(`${App.BASE_URL}/switches`)
        .then(resp => resp.json())
        .then(json => App.parseRules(json));
    };

    static loadSpaceships() {
        fetch(`${App.BASE_URL}/spaceships`)
        .then(resp => resp.json())
        .then(json => App.makeSpaceships(json))
    };

    static loadSpaceship(ship) {
        fetch(`${App.BASE_URL}/spaceships/${ship.id}`)
        .then(resp => resp.json())
        .then(json => App.makeSpaceship(json, ship))
    };

    static postSpaceship(ship) {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(ship)
        };
        fetch(`${App.BASE_URL}/spaceships`, configObj)
        .then(resp => resp.json())
        .then(json => App.reloadSpaceship(App.makeSpaceship(json), true));
    };

    static saveSpaceship(ship) {
        let configObj = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(ship)
        };
        fetch(`${App.BASE_URL}/spaceships/${ship.id}`, configObj)
        .then(resp => resp.json())
        .then(json => App.reloadSpaceship(App.makeSpaceship(json, ship)));
    };

    static deleteSpaceship(ship) {
        document.getElementById(`ship_${ship.id}`).remove();
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(ship)
        };
        fetch(`${App.BASE_URL}/spaceships/${ship.id}`, configObj)
        .then(resp => resp.json())
        .then(json => App.makeSpaceships(json))
        .then(App.removeSpaceship());
    };

    static reloadSpaceship(ship, knew = false) {
        let window = document.getElementById('desc_window');
        let message = document.getElementById('desc_name');
        message.innerText = 'Spaceship Saved!';
        if (knew) {App.listSpaceship(ship)};
        window.style.visibility = 'visible';
        App.displaySpaceship(ship)
    };

    static removeSpaceship() {
        document.getElementById('rules').style.visibility = 'hidden';
        document.getElementById('ship').style.visibility = 'hidden';
        document.getElementById('stat_block').style.visibility = 'hidden';
        let window = document.getElementById('desc_window');
        let message = document.getElementById('desc_name');
        message.innerText = 'Spaceship Deleted';
        window.style.visibility = 'visible'
    };

    static parseSystems(systemData) {
        for (let system of systemData) {
            App.objectToInstance(system, System)
        }
    };

    static parseHabitats(habitatData) {
        for (let habitat of habitatData) {
            App.objectToInstance(habitat, Habitat)
        }
    };

    static parseWeapons(weaponData) {
        for (let weapon of weaponData) {
            App.objectToInstance(weapon, Weapon)
        }
    };

    static parseFeatures(featureData) {
        for (let feature of featureData) {
            App.objectToInstance(feature, Feature)
        }
    };

    static parseRules(ruleData) {
        for (let rule of ruleData) {
            App.objectToInstance(rule, Rule)
        }
    };

    static progression(mod, stat) {
        if (App.empty(mod)) {
            return 0
        } else if (mod["any"]) {
            return mod["any"]
        } else if (mod[stat]) {
            return mod[stat]
        } else if (stat % 2 == 0) {
            return mod[6] * 10 ** ((stat - 6) / 2)
        } else {return mod[5] * 10 ** ((stat - 5) / 2)}
    }

    static empty(object) {
        if (!object) {return true} else {
        return Object.entries(object).length === 0}
    };

    static listSpaceships() {
        const list = document.getElementById('ship_list');
        list.innerHTML = '';
        let blank = document.createElement('option');
        blank.selected = 'selected';
        list.appendChild(blank);
        for (let ship of Spaceship.list) {
            let shipOption = document.createElement('option');
            shipOption.value = ship.id;
            shipOption.id = `ship_${ship.id}`;
            shipOption.name = ship.name;
            if (ship.superscience) {
                shipOption.innerText = `${ship.name} (${ship.tech_level}^)`
            } else {
                shipOption.innerText = `${ship.name} (${ship.tech_level})`
            };
            list.appendChild(shipOption)
        };
        list.addEventListener("change", () => {
            let choice = Spaceship.list.find(s => {return s.id == list.value});
            if (Spaceship.current !== choice && !!choice) {App.displaySpaceship(choice)};
        })
    };

    static listSpaceship(ship) {
        let menu = document.getElementById('ship_list');
        let shipOption = document.createElement('option');
        shipOption.value = ship.id;
        shipOption.id = `ship_${ship.id}`;
        shipOption.name = ship.name;
        if (ship.superscience) {
            shipOption.innerText = `${ship.name} (${ship.tech_level}^)`
        } else {
            shipOption.innerText = `${ship.name} (${ship.tech_level})`
        };
        menu.appendChild(shipOption)
    };

    static addItems(name, list) {
        const html = document.getElementById(`${name}_list`);
        html.innerHTML = '';
        for (let object of list) {
            if ((Spaceship.current.superscience || !object.superscience) && 
            ((name == "features" && object.size_min <= Spaceship.current.size && 
            object.size_max >= Spaceship.current.size &&
            Spaceship.current.tech_level >= object.tech_level) || name == "rules")) {
                let li = document.createElement('li');
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `${name}_${object.id}`;
                checkbox.name = object.name;
                checkbox.value = object.id;
                if (Spaceship.current[name].includes(object)) {
                    checkbox.checked = true
                };
                checkbox.addEventListener('click', () => {
                    let arr = checkbox.id.split('_');
                    if (arr[0] == "rules") {
                        App.changeShipRule(checkbox.value, checkbox.checked)
                    } else {
                        App.changeShipFeature(checkbox.value, checkbox.checked)
                    }
                    App.updateStats();
                });
                let label = document.createElement('label');
                label.for = object.id;
                label.innerText = object.name;
                let button = document.createElement('a');
                button.id = `${name}_${object.id}`;
                button.classList.add('description');
                button.href = '';
                button.innerText = ' ⓘ';
                li.appendChild(checkbox);
                li.appendChild(label);
                li.appendChild(button);
                html.appendChild(li);
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    let thing = App.findRuleOrFeature(button.id);
                    if (App.empty(thing.description)) {
                        App.loadDescription(name, thing.id)
                    }
                    else {
                        document.getElementById("desc_name").innerText = thing.name;
                        document.getElementById("main_desc").innerText = thing.description;
                        document.getElementById('desc_window').style.visibility = 'visible';
                    }
                })
            }
        }
    };

    static loadDescription(name, id) {
        if (name == 'rules') {name = 'switches'};
        fetch(`${App.BASE_URL}/${name}/${id}`)
        .then(resp => resp.json())
        .then(json => App.displayDescription(json, name))
    };

    static loadSystemDescription(system) {
        fetch(`${App.BASE_URL}/systems/${system.id}`)
        .then(resp => resp.json())
        .then(json => App.displayDescription(json, 'systems'))
    };

    static loadHabitatDescription(habitat) {
        fetch(`${App.BASE_URL}/habitats/${habitat.id}`)
        .then(resp => resp.json())
        .then(json => App.displayHabitatDescription(json))
    };

    static loadWeaponDescription(weapon) {
        fetch(`${App.BASE_URL}/weapons/${weapon.id}`)
        .then(resp => resp.json())
        .then(json => App.displayWeaponDescription(json))
    };

    static findRuleOrFeature(string) {
        let arr = string.split("_");
        if (arr[0] == 'features') {return Feature.list.find(f => {return f.id == parseInt(arr[1], 10)})}
        else {return Rule.list.find(r => {return r.id == parseInt(arr[1], 10)})}
    };

    static displayDescription(json, name) {
        let object;
        if (name == 'switches') {object = Rule.list.find(r => {return r.id == json.id})}
        else if (name == 'features') {object = Feature.list.find(f => {return f.id == json.id})}
        else {object = System.list.find(s => {return s.id == json.id})};
        object.description = json.description;
        document.getElementById("desc_name").innerText = object.name;
        document.getElementById("main_desc").innerText = object.description;
        document.getElementById('desc_window').style.visibility = 'visible';
    };

    static displayHabitatDescription(json) {
        let habitat = Habitat.list.find(h => {return h.name == json.name});
        habitat.description = json.description;
        document.getElementById("desc_name").innerText = habitat.name;
        document.getElementById("main_desc").innerText = habitat.description;
    };

    static displayWeaponDescription(json) {
        let weapon = Weapon.list.find(w => {return w.name == json.name});
        weapon.description = json.description;
        document.getElementById("desc_name").innerText = weapon.name;
        document.getElementById("main_desc").innerText = weapon.description;
    };

    static displaySpaceship(ship) {
        Spaceship.current = ship;
        App.updateSpaceship();
        document.getElementById('rules').style.visibility = 'visible';
        document.getElementById('ship').style.visibility = 'visible';
        document.getElementById('stat_block').style.visibility = 'visible';
    };

    static changeShipStat(stat, bool) {
        Spaceship.current[stat] = bool
    };

    static changeShipRule(id, bool) {
        if (bool) {Spaceship.current.rule_ids.push(parseInt(id, 10))}
        else {
            let i = Spaceship.current.rule_ids.indexOf(parseInt(id, 10));
            delete Spaceship.current.rule_ids[i];
        }
    };

    static changeShipFeature(id, bool) {
        if (bool) {Spaceship.current.feature_ids.push(parseInt(id, 10))}
        else {
            let i = Spaceship.current.feature_ids.indexOf(parseInt(id, 10));
            delete Spaceship.current.feature_ids[i];
        }
    };

    static updateSpaceship() {
        App.updateRules();
        let name = document.getElementById('name');
        name.value = Spaceship.current.name;
        let streamBox = document.getElementById('streamlined');
        streamBox.addEventListener('click', () => {
            App.changeShipStat(streamBox.id, streamBox.checked);
            App.updateSpaceship();
        });
        document.getElementById('streamlined').checked = Spaceship.current.streamlined;
        let scienceBox = document.getElementById('superscience');
        scienceBox.addEventListener('click', () => {
            App.changeShipStat(scienceBox.id, scienceBox.checked);
            App.updateSpaceship();
        });
        document.getElementById('superscience').checked = Spaceship.current.superscience;
        if (!!Spaceship.current.tech_level) {document.getElementById(`tl${Spaceship.current.tech_level}`).selected = "selected"};
        let techBox = document.getElementById('tech_level');
        techBox.addEventListener('change', () => {
            Spaceship.current.tech_level = parseInt(techBox.value, 10);
            App.updateSpaceship();
        });
        if (!!Spaceship.current.tech_level) {document.getElementById(`s${Spaceship.current.size}`).selected = "selected"};
        let sizeBox = document.getElementById('size');
        sizeBox.addEventListener('change', () => {
            Spaceship.current.size = parseInt(sizeBox.value, 10);
            App.updateSpaceship();
        });
        Spaceship.current.placements.forEach(p => {
            if (!!p.system && ((!Spaceship.current.superscience && p.system.superscience) || 
            p.system.size_min >= Spaceship.current.size ||
            p.system.size_max <= Spaceship.current.size || 
            p.system.tech_level >= Spaceship.current.tech_level)) {
                p.system_id = null;
                p.habitatSpaces = [];
                p.weaponMounts = [];
            }
        });
        App.updateStats();
    }

    static updateRules() {
        Spaceship.current.features.forEach(f => {
            if ((!Spaceship.current.superscience && f.superscience) || 
            f.size_min >= Spaceship.current.size ||
            f.size_max <= Spaceship.current.size || 
            f.tech_level >= Spaceship.current.tech_level) {
                let i = Spaceship.current.feature_ids.indexOf(f);
                Spaceship.current.feature_ids.splice(i, 1)
            }
        });
        Spaceship.current.rules.forEach(r => {
            if (!Spaceship.current.superscience && r.superscience) {
                let i = Spaceship.current.rule_ids.indexOf(f);
                Spaceship.current.rule_ids.splice(i, 1)
            }
        });
        App.addItems('rules', Rule.list);
        App.addItems('features', Feature.list);
        App.populateSystems()
    }

    static updateStats() {
        let cost = document.getElementById('cost');
        let c = Spaceship.current.cost;
        let d = c.toString().length;
        let l;
        if (d >= 13) {l = "T"} else if (d >= 10) {l = "B"} else if (d >= 7) {l = "M"} else if (d >= 4) {l = "K"} else {l = ""};
        cost.innerText = `$${c / (10 ** (d - 2))}${l}`;
        document.getElementById('dst').innerText = Spaceship.current.dST;
        document.getElementById('hp').innerText = Spaceship.current.dST;
        document.getElementById('ht').innerText = Spaceship.current.HT;
        document.getElementById('hnd').innerText = Spaceship.current.Hnd;
        document.getElementById('sr').innerText = Spaceship.current.SR;
        let r = Spaceship.current.range;
        if (r == Infinity) {r = 'c'} else {r = r.toString()};
        document.getElementById('g').innerText = `${Spaceship.current.totalThrust}G`;
        document.getElementById('range').innerText = r;
        document.getElementById('weight').innerText = Spaceship.current.loadWeight;
        document.getElementById('ddr').innerText = `${Spaceship.current.front.armor}/${Spaceship.current.center.armor}/${Spaceship.current.rear.armor}`;
        document.getElementById('occ').innerText = `${Spaceship.current.asv}ASV`;
        document.getElementById('load').innerText = Spaceship.current.load;
        document.getElementById('air_accel').innerText = Spaceship.current.airAccel;
        document.getElementById('air_move').innerText = Spaceship.current.airMove;
        document.getElementById('air_hnd').innerText = Spaceship.current.airHnd;
        document.getElementById('air_sr').innerText = Spaceship.current.airSR
    };

    static buildMenu(hull, i, options) {
        let menu = document.getElementById(`${hull}_${i}`);
        menu.innerHTML = "";
        let blank = document.createElement('option');
        blank.id = `${hull}_${i}_blank`;
        blank.value = 0;
        blank.selected = "selected";
        menu.appendChild(blank);
        System.list.forEach(system => {
            if ((Spaceship.current.superscience || !system.superscience) && 
            system.size_min <= Spaceship.current.size &&
            system.size_max >= Spaceship.current.size && 
            options.includes(system.hull_placement) && 
            system.tech_level <= Spaceship.current.tech_level) {
                let option = document.createElement('option');
                option.value = system.id;
                option.id = (`${hull}_${i}_${system.id}`);
                option.innerText = system.name;
                if (!!Spaceship.current[hull].location(i) && Spaceship.current[hull].location(i).system == system) {
                    option.selected = "selected"
                };
                menu.appendChild(option)
            }
        })
        menu.addEventListener('change', () => {
            if (menu.value !== 0) {
                let arr = menu.id.split('_');
                let v = menu.value;
                let place = Spaceship.current[arr[0]].location(arr[1]);
                place.system_id = parseInt(v, 10);
                App.updateStats();
            }
        });
        let block = document.getElementById(`${hull}_${i}_info`);
        if (!!document.getElementById(`${hull}_${i}_button`)) {
            document.getElementById(`${hull}_${i}_button`).remove()
        };
        let button = document.createElement('a');
        button.href = '';
        button.id = `${hull}_${i}_button`;
        button.classList.add('description');
        button.innerText = ' ⓘ';
        button.addEventListener("click", (e) => {
            e.preventDefault();
            let arr = button.id.split('_');
            let v = document.getElementById(`${arr[0]}_${arr[1]}`).value;
            if (v !== 0) {
                let thing = System.list.find(s => {return s.id == v});
                if (thing.name == "Habitat") {
                    App.habitatWindow(Spaceship.current[arr[0]].location(arr[1]))
                } else if (thing.name.includes('Weapons')) {
                    App.weaponsWindow(Spaceship.current[arr[0]].location(arr[1]))
                };
                if (App.empty(thing.description)) {
                    App.loadSystemDescription(thing)
                } else {
                    document.getElementById("desc_name").innerText = thing.name;
                    document.getElementById("main_desc").innerText = thing.description;
                    document.getElementById('desc_window').style.visibility = 'visible';
                }
            }
        })
        block.appendChild(button);
    };

    static blankCore(hull) {
        let top = document.getElementById(`top_${hull}_core`);
        top.innerHTML = '';
        let line = document.createElement('td');
        line.id = `${hull}_core`;
        line.innerText = 'Core :';
        line.classList.add('number');
        let box = document.createElement('input');
        box.type = 'checkbox';
        box.id = `cb_${hull}`;
        box.classList.add('core_checks');
        line.appendChild(box);
        top.appendChild(line);
    };

    static buildCoreMenu(section) {
        let top = document.getElementById(`top_${section}_core`);
        top.innerHTML = '';
        let line = document.createElement('td');
        line.id = `${section}_core`;
        line.innerText = 'Core :'
        line.classList.add('number');
        let box = document.createElement('input');
        box.type = 'checkbox';
        box.id = `cb_${section}`;
        box.checked = true;
        box.classList.add('core_checks');
        let spot = document.createElement('td');
        spot.id = `${section}_0_info`;
        let select = document.createElement('select');
        select.id = `${section}_0`;
        select.classList.add('placement_choice');
        spot.appendChild(select);
        line.appendChild(box);
        top.appendChild(line);
        top.appendChild(spot);
        App.buildMenu(section, 0, ["any"])
    };

    static updateCores() {
        let cores = Spaceship.current.placements.filter(p => {return p.location == 0});
        let hulls = ["front", "center", "rear"];
        cores.forEach(core => {
            App.buildCoreMenu(core.hull.section);
            let n = hulls.indexOf(core.hull.section);
            hulls.splice(n, 1);
        });
        if (hulls.length == 1) {
            let top = document.getElementById(`top_${hulls[0]}_core`);
            top.innerHTML = '';
            let blank = document.createElement('td');
            let warning = document.createElement('td');
            warning.innerHTML = '';
            warning.innerText = 'Only 2 Core Spaces Allowed.';
            warning.classList.add('warning');
            top.appendChild(blank);
            top.appendChild(warning);
        } else {
            hulls.forEach(hull => {
                App.blankCore(hull);
            })
        };
        App.rebuildCoreMenus();
    };

    static rebuildCoreMenus() {
        let core_checks = document.getElementsByClassName('core_checks');
        for (let i = 0; i < core_checks.length; i++) {
            let check = core_checks[i];
            check.addEventListener('click', (e) => {
                let me = document.getElementById(e.toElement.id);
                let hull = e.toElement.id.split('_')[1];
                if (!!me.checked && !(!!Spaceship.current[hull].location(0))) {
                    let place = new Placement();
                    place.hull_id = Spaceship.current[hull].id;
                    place.location = 0;
                    if (!!Spaceship.current[hull].location(0)) {
                        place.id = Spaceship.current[hull].location(0).id;
                    } else {
                        place.id = place.hull_id + place.location - 50
                    };
                    Spaceship.current[hull].placements.push(place);
                    Placement.list.push(place);
                    App.buildCoreMenu(hull)
                } else if (!(!!me.checked)) {
                    let i = Spaceship.current[hull].placements.indexOf(Spaceship.current[hull].location(0));
                    Spaceship.current[hull].placements.splice(i, 1)
                };
                App.updateStats();
                App.updateCores()
            })
        }
    };

    static populateSystems() {
        App.updateCores();
        let hulls = ["front", "center", "rear"];
        hulls.forEach(hull => {
            let options = ["any", "hull"];
            for (let i = 1; i <= 6; i++) {
                options.push(hull);
                App.buildMenu(hull, i, options);
            }
        });
        App.rebuildCoreMenus()
    };

    static closeButton() {
        let button = document.getElementById('desc_button');
        button.addEventListener('click', () => {
            document.getElementById('desc_window').style.visibility = 'hidden';
            document.getElementById('desc_name').innerText = '';
            document.getElementById('main_desc').innerText = '';
            document.getElementById('habitat_window').innerText = '';
            document.getElementById('weapon_window').innerText = '';
        })
    };

    static weaponsWindow(place) {
        let freeSpaces = place.weaponsSize - place.weaponMounts.length;
        let weaponHash = {};
        Weapon.list.forEach(weapon => {
            if (Spaceship.current.superscience || !weapon.superscience) {
                weaponHash[weapon.id] = [];
                weaponHash[weapon.id][0] = 0;
                place.weaponMounts.forEach(m => {
                    if (!!m.weapon && m.weapon.name == weapon.name) {
                        weaponHash[weapon.id][0]++;
                        weaponHash[weapon.id][1] = m.id
                    }
                })
            }
        });
        let window = document.getElementById('weapon_window');
        window.innerHTML = '';
        let h4 = document.createElement('h4');
        h4.innerText = `You have ${place.weaponsSize} weapons to chose from.`;
        window.appendChild(h4);
        let table = document.createElement('table');
        table.id = 'weapons_table';
        let heading = document.createElement('tr');
        heading.id = 'weapons_table_heading';
        let name = document.createElement('th');
        name.id = 'weapon_name';
        name.innerText = 'Name';
        heading.appendChild(name);
        let damage = document.createElement('th');
        damage.id = 'weapon_damage';
        damage.innerText = 'Damage';
        heading.appendChild(damage);
        let acc = document.createElement('th');
        acc.id = 'weapon_acc';
        acc.innerText = 'Accuracy';
        heading.appendChild(acc);
        let range = document.createElement('th');
        range.id = 'weapon_range';
        range.innerText = 'Range';
        heading.appendChild(range);
        let shots = document.createElement('th');
        shots.id = 'weapon_shots';
        shots.innerText = 'Shots';
        heading.appendChild(shots);
        let count = document.createElement('th');
        count.id = 'weapon_count';
        count.innerText = 'Count';
        heading.appendChild(count);
        table.appendChild(heading);
        Object.keys(weaponHash).map(id => {
            let count = weaponHash[id][0];
            let weapon = Weapon.list.find(w => {return w.id == id})
            let mount;
            if (count == 0) {
                mount = new WeaponMount();
                mount.placement_id = place.id;
                mount.weapon_id = weapon.id;
            } else {
                mount = WeaponMount.list.find(m => {return m.id == weaponHash[id][1]})
            }
            let row = document.createElement('tr');
            let wname = document.createElement('td');
            wname.innerText = weapon.name;
            row.appendChild(wname);
            let wdamage = document.createElement('td');
            wdamage.innerText = mount.damage;
            row.appendChild(wdamage);
            let wacc = document.createElement('td');
            wacc.innerText = mount.acc;
            row.appendChild(wacc);
            let wrange = document.createElement('td');
            wrange.innerText = mount.range;
            row.appendChild(wrange);
            let wshots = document.createElement('td');
            wshots.innerText = mount.shots;
            row.appendChild(wshots);
            let wcount = document.createElement('td');
            let input = document.createElement('input');
            input.id = weapon.name;
            input.name = `${place.id}_${count}`;
            input.type = 'number';
            input.value = count;
            input.min = 0;
            input.max = count + freeSpaces + 1;
            input.addEventListener('change', () => {
                let arr = input.name.split('_');
                let ment = Placement.list.find(p => {return p.id == arr[0]});
                if (input.value < arr[1]) {
                    let lost = ment.weaponMounts.find(m => {return m.weapon.name == input.id});
                    let i = ment.weaponMounts.indexOf(lost);
                    ment.weaponMounts.splice(i, 1);
                } else {
                    let gain = new WeaponMount();
                    gain.id = Math.min.apply(Math, WeaponMount.list.map(m => {return m.id})) - 1
                    gain.placement_id = ment.id;
                    let weap = Weapon.list.find(w => {return w.name == input.id});
                    gain.weapon_id = weap.id;
                    ment.weaponMounts.push(gain);
                    WeaponMount.list.push(gain);
                };
                App.weaponsWindow(ment);
                App.updateStats()
            });
            wcount.appendChild(input);
            row.appendChild(wcount);
            let button = document.createElement('a');
            button.href = '';
            button.id = `weapon_${weapon.id}_button`;
            button.classList.add('description');
            button.innerText = ' ⓘ';
            button.addEventListener("click", (e) => {
                e.preventDefault();
                let arr = button.id.split('_');
                let weap = Weapon.list.find(h => h.id == arr[1]);
                if (App.empty(weap.description)) {
                    App.loadWeaponDescription(weap)
                } else {
                    document.getElementById("desc_name").innerText = weap.name;
                    document.getElementById("main_desc").innerText = weap.description;
                }
            })
            wname.appendChild(button);
            table.appendChild(row);
        })
        window.appendChild(table)
    }

    static habitatWindow(place) {
        let freeSpaces = place.habitatsSize - place.habitats.reduce(function(total, hab) {return total + hab.size}, 0);
        let habitatHash = {};
        Habitat.list.forEach(habitat => {
            if (Spaceship.current.superscience || !habitat.superscience) {
                habitatHash[habitat.name] = [];
                habitatHash[habitat.name][0] = 0;
                habitatHash[habitat.name][1] = habitat.size;
                place.habitats.forEach(h => {
                    if (h.name == habitat.name) {
                        habitatHash[habitat.name][0]++
                    }
                })
            }
        })
        let window = document.getElementById('habitat_window');
        window.innerHTML = '';
        let h4 = document.createElement('h4');
        h4.innerText = `You have ${(place.habitatsSize / 4)} habitat spaces to choose from.`;
        window.appendChild(h4);
        let table = document.createElement('table');
        table.id = 'habitat_table';
        Object.keys(habitatHash).map(key => {
            let value = habitatHash[key][0];
            let spaces = habitatHash[key][1];
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let label = document.createElement('label');
            label.for = key;
            let phrase;
            if (spaces == 4) {phrase = `${spaces / 4} space`} else {phrase = `${spaces / 4} spaces`};
            label.innerText = `${key}, ${phrase} : `;
            td1.appendChild(label);
            let input = document.createElement('input');
            input.id = key;
            input.name = `${place.id}_${value}`;
            input.type = 'number';
            input.min = 0;
            input.value = value;
            input.max = value + Math.floor((freeSpaces / spaces));
            input.addEventListener('change', () => {
                let arr = input.name.split('_');
                let ment = Placement.list.find(p => {return p.id == arr[0]});
                if (input.value < arr[1]) {
                    let lost = ment.habitatSpaces.find(s => {return s.habitat.name == input.id});
                    let i = ment.habitatSpaces.indexOf(lost);
                    ment.habitatSpaces.splice(i, 1);
                } else {
                    let gain = new HabitatSpace();
                    gain.placement_id = ment.id;
                    let hab = Habitat.list.find(h => {return h.name == input.id});
                    gain.habitat_id = hab.id;
                    ment.habitatSpaces.push(gain)
                };
                App.habitatWindow(ment);
                App.updateStats()
            });
            let button = document.createElement('a');
            button.href = '';
            button.id = `habitat_${key}_button`;
            button.classList.add('description');
            button.innerText = ' ⓘ';
            button.addEventListener("click", (e) => {
                e.preventDefault();
                let arr = button.id.split('_');
                let hab = Habitat.list.find(h => h.name == arr[1]);
                if (App.empty(hab.description)) {
                    App.loadHabitatDescription(hab)
                } else {
                    document.getElementById("desc_name").innerText = hab.name;
                    document.getElementById("main_desc").innerText = hab.description;
                }
            })
            td2.appendChild(input);
            td2.appendChild(button);
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
        })
        window.appendChild(table)
    };

    static newShip() {
        let ship = new Spaceship();
        ship.id = 0;
        let front = new Hull(-1, 'front', ship.id);
        let center = new Hull(-2, 'center', ship.id);
        let rear = new Hull(-3, 'rear', ship.id);
        ship.hulls.push(front);
        ship.hulls.push(center);
        ship.hulls.push(rear);
        let n = -1;
        ship.hulls.forEach(hull => {
            Hull.list.push(hull);
            for (let i = 1; i <= 6; i++) {
                let place = new Placement(n, i, hull.id, null, null);
                hull.placements.push(place);
                Placement.list.push(place)
                n = n - 1;
            }
        });
        ship.superscience = false;
        ship.streamlined = false;
        ship.size = 5;
        ship.tech_level = 10;
        ship.name = 'New Ship';
        Spaceship.list.push(ship);
        App.displaySpaceship(ship);
    };

    static saveShip() {
        Spaceship.current.name = document.getElementById('name').value;
        if (Spaceship.current.id <= 0) {
            Spaceship.current.id = null;
            Spaceship.current.hulls.forEach(h => {
                h.id = null;
                h.placements.forEach(p => {
                    p.id = null;
                    p.hull_id = null
                })
            });
            App.postSpaceship(Spaceship.current);
        } else {
            Spaceship.current.placements.forEach(p => {
                if (p.id <= 0) {p.id = null}
                p.weaponMounts.forEach(m => {
                    if (m.id <= 0) {m.id = null}
                })
            });
            Spaceship.current.hulls.forEach(h => {
                if (h.id <= 0) {h.id = null}
            })
            App.saveSpaceship(Spaceship.current);
        }
    };

    static removeShip() {
        let ship = Spaceship.current;
        Spaceship.current = null;
        let e = document.getElementById(`ship_${ship.id}`);
        e.remove;
        App.deleteSpaceship(ship)
    }

    static newShipButton() {
        let button = document.getElementById('new');
        button.addEventListener('click', () => {App.newShip()})
    };

    static saveShipButton() {
        let button = document.getElementById('save');
        button.addEventListener('click', () => {App.saveShip()})
    };

    static removeShipButton() {
        let button = document.getElementById('delete');
        button.addEventListener('click', () => {App.removeShip()})
    }
}