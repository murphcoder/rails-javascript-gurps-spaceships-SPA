const BASE_URL = "http://localhost:3000";

function objectToInstance(object, klass) {
    let instance = new klass();
    Object.keys(object).forEach(function(key) {instance[key] = object[key];});
    return instance;
};

function makeSpaceships(shipData) {
    spaceshipList = [];
    for (object of shipData) {makeSpaceship(object)}
    listSpaceships();
};

function makeSpaceship(object, ship = new Spaceship()) {
    Object.keys(object).forEach(function(key) {
        if (object[key] != null && object[key].constructor != Array) {
            ship[key] = object[key]
    }});
    ship.hulls = [];
    ship.feature_ids = [];
    ship.rule_ids = [];
    object.hulls.forEach(function(hull) {ship.hulls_attributes.push(makeHull(hull))});
    object.features.forEach(function(feature) {ship.feature_ids.push(feature.id)});
    object.switches.forEach(function(rule) {ship.rule_ids.push(rule.id)});
    spaceshipList.push(ship);
    return ship;
};

function makeHull(object) {
    let hull = new Hull();
    Object.keys(object).forEach(function(key) {
        if (object[key] != null && object[key].constructor != Array) {
            hull[key] = object[key]
    }});
    object.placements.forEach(function(placement) {hull.placements_attributes.push(makePlacement(placement))});
    hullList.push(hull);
    return hull;

};

function makePlacement(object) {
    let placement = new Placement();
    Object.keys(object).forEach(function(key) {
        if (object[key] != null && object[key].constructor != Array) {
            placement[key] = object[key]
    }});
    object.weapon_mounts.forEach(function(weapon_mount) {placement.weapon_mounts_attributes.push(makeWeaponMount(weapon_mount))});
    object.habitat_spaces.forEach(function(habitat_space) {placement.habitat_spaces_attributes.push(makeHabitatSpace(habitat_space))});
    placementList.push(placement);
    return placement;
};

function makeHabitatSpace(object) {
    let habitatSpace = objectToInstance(object, HabitatSpace);
    habitatSpaceList.push(habitatSpace)
    return habitatSpace;
};

function makeWeaponMount(object) {
    let weaponMount = objectToInstance(object, WeaponMount);
    weaponMountList.push(weaponMount);
    return weaponMount;
};

function loadSystems() {
    fetch(`${BASE_URL}/systems`)
    .then(resp => resp.json())
    .then(json => parseSystems(json));
};

function loadHabitats() {
    fetch(`${BASE_URL}/habitats`)
    .then(resp => resp.json())
    .then(json => parseHabitats(json));
};

function loadWeapons() {
    fetch(`${BASE_URL}/weapons`)
    .then(resp => resp.json())
    .then(json => parseWeapons(json));
};

function loadFeatures() {
    fetch(`${BASE_URL}/features`)
    .then(resp => resp.json())
    .then(json => parseFeatures(json));
};

function loadRules() {
    fetch(`${BASE_URL}/switches`)
    .then(resp => resp.json())
    .then(json => parseRules(json));
};

function loadSpaceships() {
    fetch(`${BASE_URL}/spaceships`)
    .then(resp => resp.json())
    .then(json => makeSpaceships(json))
};

function loadSpaceship(ship) {
    fetch(`${BASE_URL}/spaceships/${ship.id}`)
    .then(resp => resp.json())
    .then(json => makeSpaceship(json, ship))
};

function postSpaceship(ship) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(ship)
    };
    fetch(`${BASE_URL}/spaceships`, configObj)
    .then(resp => resp.json())
    .then(json => listSpaceship(makeSpaceship(json, ship)));
};

function saveSpaceship(ship) {
    let configObj = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(ship)
    };
    fetch(`${BASE_URL}/spaceships/${ship.id}`, configObj)
    .then(resp => resp.json())
    .then(json => makeSpaceship(json, ship));
};

function deleteSpaceship(ship) {
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(ship)
    };
    fetch(`${BASE_URL}/spaceships/${ship.id}`, configObj)
    .then(resp => resp.json())
    .then(json => makeSpaceships(json))
    .then(removeSpaceship());
};

function reloadSpaceship(object) {
    let window = document.getElementById('desc_window');
    let message = document.getElementById('desc_name');
    message.innerText = 'Spaceship Saved!';
    window.style.visibility = 'visible';
    let id = object.id;
    makeSpaceships()
    let ship = spaceshipList.find(s => {s.id == id});
    displaySpaceship(ship)
};

function removeSpaceship() {
    document.getElementById('rules').style.visibility = 'hidden';
    document.getElementById('ship').style.visibility = 'hidden';
    document.getElementById('stat_block').style.visibility = 'hidden';
    let window = document.getElementById('desc_window');
    let message = document.getElementById('desc_name');
    message.innerText = 'Spaceship Deleted';
    window.style.visibility = 'visible'
};

function parseSystems(systemData) {
    for (system of systemData) {
        objectToInstance(system, System)
    }
};

function parseHabitats(habitatData) {
    for (habitat of habitatData) {
        objectToInstance(habitat, Habitat)
    }
};

function parseWeapons(weaponData) {
    for (weapon of weaponData) {
        objectToInstance(weapon, Weapon)
    }
};

function parseFeatures(featureData) {
    for (feature of featureData) {
        objectToInstance(feature, Feature)
    }
};

function parseRules(ruleData) {
    for (rule of ruleData) {
        objectToInstance(rule, Rule)
    }
};

function progression(mod, stat) {
    if (empty(mod)) {
        return 0
    } else if (mod["any"]) {
        return mod["any"]
    } else if (mod[stat]) {
        return mod[stat]
    } else if (stat % 2 == 0) {
        return mod[6] * 10 ** ((stat - 6) / 2)
    } else {return mod[5] * 10 ** ((stat - 5) / 2)}
}

function empty(object) {
    if (!object) {return true} else {
    return Object.entries(object).length === 0}
};

let spaceshipList = [];
let hullList = [];
let placementList = [];
let weaponMountList = [];
let habitatSpaceList = [];

class Spaceship {
    constructor(id, 
        name, 
        tech_level, 
        size, 
        streamlined, 
        superscience, 
    ) {
        this.id = id;
        this.name = name;
        this.tech_level  = tech_level;
        this.size = size;
        this.streamlined = streamlined;
        this.superscience = superscience;
        this.hulls_attributes = [],
        this.feature_ids = [],
        this.rule_ids = []
    };

    get hulls() {
        return this.hulls_attributes;
    };

    get front() {
        return this.hulls.find(function(hull) {return hull.section === "front"});
    };

    get center() {
        return this.hulls.find(function(hull) {return hull.section === "center"});
    };

    get rear() {
        return this.hulls.find(function(hull) {return hull.section === "rear"});
    };

    get placements() {
        return [...this.front.placements, ...this.center.placements, ...this.rear.placements];
    };

    get systems() {
        return this.placements.map(function(placement) {return placement.system});
    };

    get features() {
        return featureList.filter(function(feature) {return this.feature_ids.includes(feature.id)}.bind(this))
    };

    get rules() {
        return rulesList.filter(function(rule) {return this.rule_ids.includes(rule.id)}.bind(this))
    };

    get workspaces() {
        let base = this.placements.reduce(function(total, placement) {return total + placement.workspaces}, 0)
        if (!!this.features.filter(f => {return f.name == "High Automation".length})) {
            base = base / 10
        } else if (!!this.features.filter(f => {return f.name == "Total Automation"}).length) {
            base = 0
        };
        return base
    };

    get engineCost() {
        return this.placements.reduce(function(total, placement) {
            if (!!placement.system && placement.system.name.includes("Reaction Engine")) {
                return (total + placement.cost)
            } else {return total}
        }, 0)
    };

    get engineRoom() {
        return !!this.systems.filter(s => {
            if (!!s) {return s.name == "Engine Room"} else {return false}
        }).length
    };

    get featuresCost() {
        return this.features.reduce(function(total, feature) {
            if (!!feature.cost) {
                if (!!feature.cost["any"]) {
                    return total + feature.cost["any"]
                } else if (!!feature.cost.multiplier) {
                    switch (feature.cost.statistic) {
                        case "workspaces": 
                            return total + feature.cost.multiplier * this.workspaces;
                        break;
                        case "engine cost":
                            return total + feature.cost.multiplier * this.engineCost;
                        break;
                    }
                } else {
                    return total + progression(feature.cost, this.size)
                }
            } else {return 0}
        }.bind(this), 0)
    };

    get totalThrust() {
        return this.systems.reduce(function(total, system) {
            if (!!system && !!system.modifiers.thrust) {
                if (!!system.modifiers.thrust.any) {
                    return total + system.modifiers.thrust.any
                } else {
                    return total + system.modifiers.thrust[this.tech_level]
                }
            } else {return total}
        }.bind(this), 0.0)
    };

    get cost() {
        function totalCost(total, placement) {return (total + placement.cost)};
        return this.placements.reduce(totalCost, 0) + this.featuresCost;
    };

    get dST() {
        switch (this.size) {
            case 5: return 20; break;
            case 6: return 30; break;
            case 7: return 50; break;
            case 8: return 70; break;
            case 9: return 100; break;
            case 10: return 150; break;
            case 11: return 200; break;
            case 12: return 300; break;
            case 13: return 500; break;
            case 14: return 700; break;
            case 15: return 1000;
        }
    };

    get HT() {
        let ht = 13;
        if (!this.engineRoom && this.size >= 5 && this.size <= 9) {
            ht = ht - 1
        } else if (!!(this.features.filter(f => {return f.name.includes("Automation")}).length)  && this.tech_level <= 9) {
            ht = ht -1
        } else if (!!this.systems.filter(s => {if (!!s) {return ['Robofac', 'Fabricator', 'Nanofactory', 'Replicator'].includes(s.name)} else {return false}}).length) {ht = ht + 1};
        return ht;
    };

    get baseHnd() {
        switch (this.size) {
            case 5: return 0; break;
            case 6: return 0; break;
            case 7: return -1; break;
            case 8: return -1; break;
            case 9: return -1; break;
            case 10: return -2; break;
            case 11: return -2; break;
            case 12: return -2; break;
            case 13: return -3; break;
            case 14: return -3; break;
            case 15: return -3;
        }
    };

    hndOrSR(stat) {
        if (this.tech_level <= 8) {stat = stat - 1};
        if (this.totalThrust >= 1000.0) {stat = stat + 3} 
        else if (this.totalThrust >= 100.0) {stat = stat + 2}
        else if (this.totalThrust >= 10.0) {stat = stat + 1}
        else if (this.totalThrust >= 1.0) {}
        else if (this.totalThrust >= 0.1) {stat = stat - 1}
        else if (this.totalThrust >= 0.01) {stat = stat - 2}
        else {stat = stat - 3};
        return stat
    };

    get Hnd() {
        return this.hndOrSR(this.baseHnd)
    };

    get baseSR() {
        if (this.size <= 6) {return 4} else {return 5}
    };

    get SR() {
        return this.hndOrSR(this.baseSR)
    };

    get range() {
        if (!!this.systems.filter(s => {if (!!s) {return (s.name.includes("Reactionless") || (s.name == "Magsail") || (s.name == "Lightsail"))} else {return false}}).length) {
            return Infinity
        } else {
            let engine = this.systems.find(s => {if (!!s) {return s.name.includes("Reaction Engine")} else {return false}});
            if (!!engine) {
                let fuelTanks = this.placements.filter(p => {return !!p.system && p.system.name == "Fuel Tank"}).length;
                let deltaV
                if (!!engine.delta_v["any"]) {
                    deltaV = engine.delta_v["any"]
                } else {
                    deltaV = engine.delta_v[this.tech_level]
                }
                if (fuelTanks >= 6 && fuelTanks <= 8) {
                    deltaV = deltaV * 1.2
                } else if (fuelTanks >= 9 && fuelTanks <= 12) {
                    deltaV = deltaV * 1.4
                } else if (fuelTanks == 13 || fuelTanks == 14) {
                    deltaV = deltaV * 1.6
                } else if (fuelTanks == 15) {deltaV = deltaV * 1.8}
                else if (fuelTanks == 16) {deltaV = deltaV * 2}
                else if (fuelTanks == 17) {deltaV = deltaV * 2.2}
                else if (fuelTanks == 18) {deltaV = deltaV * 2.5}
                else if (fuelTanks == 19) {deltaV = deltaV * 3.0};
                return deltaV * fuelTanks
            } else {return 0}
        }
    };

    get loadWeight() {
        return progression({5: 30, 6: 100}, this.size)
    };

    occ(stat) {
        return this.placements.reduce(function(total, placement) {
            if (!!placement[stat]) {return total + placement[stat]} else {return total}
        }, 0)
    }

    get asv() {
        return this.occ("asv")
    };

    get sv() {
        return this.occ("sv")
    };

    get sleep() {
        return this.occ("sleep")
    };

    get cargo() {
        return this.placements.reduce(function(total, placement) {
            return total + placement.cargo
        }, 0)
    };

    get load() {return this.cargo + 0.1 * (this.asv + this.sv + this.sleep)};

    get forceField() {
        return this.systems.filter(s => {return !!s.modifiers.force_ddr}).reduce(function(total, system) {
            return total + system.modifiers.force_ddr[this.tech_level][this.size]
        }.bind(this), 0)
    };

    get ftl() {
        return this.systems.filter(s => {return !!s.modifiers.ftl}).reduce(function(total, system) {
            return total + system.modifiers.ftl
        }.bind(this), 0)
    }

    get airThrust() {
        let aThrust;
        let arr = this.systems.filter(s => {if (!!s) {return !!s.modifiers.atmospheric_thrust} else {return false}})
        if (empty(arr)) {aThrust = 0} else {aThrust = arr.reduce(function(total, system) {
            return total + system.modifiers.atmospheric_thrust
        }.bind(this))};
        return aThrust + this.totalThrust;
    };

    get airAccel() {
        return this.airThrust * 10;
    }

    get airMove() {
        let s;
        if (this.streamlined) {s = 2500} else {s = 250};
        return Math.round((Math.sqrt(this.airThrust) * s) / 100) * 100;
    };

    get airHnd() {
        let ah = this.Hnd;
        if (!!this.systems.find(s => {if (!!s) {return s.modifiers.contragravity} else {return false}})) {
            ah = ah + 2
        };
        if (!!this.features.find(f => {return f.name == "Winged"})) {
            ah = ah + 4
        };
        if (ah > 5) {ah = 5};
        return ah
    };

    get airSR() {
        if (!!this.features.find(f => {return f.name == "Winged"})) {
            return this.SR + 1;
        } else {return this.SR}
    }

};

class Hull {
    constructor(id, section, spaceship_id) {
        this.id = id;
        this.section = section;
        this.spaceship_id = spaceship_id;
        this.placements_attributes = [];
    };

    get spaceship() {
        return spaceshipList.find(function(ship) {return ship.id == this}, this.spaceship_id);
    };

    get placements() {
        return this.placements_attributes;
    };

    get systems() {
        return this.placements.map(function (placement) {return placement.system})
    };

    get armor() {
        let sa;
        let size = this.spaceship.size;
        if (this.spaceship.streamlined) {sa = "sl_ddr"} else {sa = "us_ddr"};
        return this.systems.reduce(function(total, system) {
            if (!!system && system.modifiers[sa]) {
                return total + system.modifiers[sa][size]
            } else {return total}
        }, 0)
    };

    location(num) {
        return this.placements.find(function(placement) {return placement.location == num});
    }
};

class Placement {
    constructor(id, location, hull_id, system_id, fuel) {
        this.id = id;
        this.location = location;
        this.hull_id = hull_id;
        this.system_id = system_id;
        this.fuel = fuel;
        this.habitat_spaces_attributes = [];
        this.weapon_mounts_attributes = []
    };

    get system() {
        return systemList.find(function(system) {return system.id == this}, this.system_id);
    };

    get hull() {
        return hullList.find(function(hull) {return hull.id == this}, this.hull_id);
    };

    get section() {
        return this.hull.section
    };

    get spaceship() {
        return this.hull.spaceship
    };

    get size() {
        return this.spaceship.size
    };

    get workspaces() {
        if (!!this.system && this.system.wspaces && this.size >= 10) {
           switch (this.size) {
               case 10: return 1; break;
               case 11: return 3; break;
               case 12: return 10; break;
               case 13: return 30; break;
               case 14: return 100; break;
               case 15: return 300;
           }
        } else if (!!this.system && this.system.name == "Engine Room") {
            switch (this.size) {
                case 9: return 2; break;
                default: return 1;
            }
        } else {return 0}
    };

    get habitatSpaces() {
        return this.habitat_spaces_attributes;
    };

    get habitats() {
        return this.habitatSpaces.map(function(space) {return space.habitat});
    };

    get weapons() {
        return this.weaponMounts.map(function(mount) {return mount.weapon});
    }

    get weaponMounts() {
        return this.weapon_mounts_attributes;
    };

    get habitatsSize () {
        let spaces;
        if (!!this.system && !!this.system.modifiers.habitat_spaces) {
            spaces = this.system.modifiers.habitat_spaces;
            let size = this.spaceship.size;
            if (spaces[size]) {
                return spaces[size]
            } else if (size % 2 == 0) {
                return spaces[8] * 10 ** ((size - 8) / 2)
            } else {
                return spaces[7] * 10 ** ((size - 7) / 2)
            }
        } else {return 0}
    };

    get habitatsFull () {
        function countHabitats(total, habitat) {total + habitat.size};
        if (empty(this.habitats)) {return true} else {
            return this.habitatSize <= this.habitats.reduce(countHabitats, 0)
        }
    };

    get weaponsSize () {
        if (!!this.system && this.system.modifiers.weapons) {
            return this.system.modifiers.weapons
        } else {return 0}
    };

    get weaponsFull () {
        return this.weaponsSize <= this.weaponMounts.length
    }

    get trueWeapons () {return this.weaponMounts.filter(mount => mount.true).length};

    get extraHabitatCost () {
        function addHabitats(total, space) {return (total + space.cost)};
        return this.habitat_spaces_attributes.reduce(addHabitats, 0);
    };

    get cost () {
        if (!!this.system) {
            let base = progression(this.system.cost, this.spaceship.size);
            if (!empty(this.weaponMounts)) {
                return (base * (this.trueWeapons / this.weaponMounts.length))
            } else if (!empty(this.habitatSpaces)) {
                return (this.extraHabitatCost + base)
            } else {return base}
        } else {return 0}
    };

    get asv () {
        if (!!this.habitatSpaces.length) {
            return this.habitatSpaces.filter(s => {
                return !!s.habitat.modifiers.asv
            }).reduce(function(total, space) {return total + space.habitat.modifiers.asv}, 0)
        } else {return 0}
    };

    get sv () {
        if (!!this.system && !!this.system.modifiers.sv) {
            return progression(this.system.modifiers.sv, this.size)
        } else {return 0};
    };

    get sleep () {
        if (!!this.habitatSpaces.length) {
            return this.habitatSpaces.filter(s => {
                return !!s.habitat.modifiers.sleep
            }).reduce(function(total, space) {return total + space.habitat.modifiers.sleep}, 0)
        } else {return 0}
    };

    get cargo() {
        if (!!this.system) {
            let cg = 0;
            if (!empty(this.system.modifiers.cargo)) {
                cg = cg + progression(this.system.modifiers.cargo, this.size)
            };
            if (!!this.habitatSpaces.length) {
                let hc = this.habitatSpaces.filter(s => {return s.habitat.modifiers.cargo}).reduce(function(total, space) {
                    return total + space.habitat.modifiers.cargo
                }, 0);
                cg = cg + hc
            };
            if (!!(this.weaponSize - this.trueWeapons)) {
                let w = (progression({5: 1.5, 6: 5}, this.size) * (this.trueWeapons / this.weaponsSize));
                w = Math.round(w * 2) / 2;
                cg = cg + w
            };
            return cg
        } else {return 0}
    }
};

class HabitatSpace {
    constructor(id, habitat_id, placement_id) {
        this.id = id;
        this.habitat_id = habitat_id;
        this.placement_id = placement_id;
    };

    get placement() {
        return placementList.find(function(placement) {return placement.id == this}, this.placement_id);
    };

    get habitat() {
        return habitatList.find(function(habitat) {return habitat.id == this}, this.habitat_id);
    };

    get cost() {
        if (!!this.habitat.cost) {
            return this.habitat.cost
        } else {return 0}
    };

    get spaceship() {
        return this.placement.hull.spaceship
    }

};

class WeaponMount {
    constructor(id, weapon_id, placement_id, kind) {
        this.id = id;
        this.weapon_id = weapon_id;
        this.placement_id = placement_id;
        this.kind = kind;
    };

    get beamOutput() {
        return progression({5: 10000000, 6: 30000000}, this.weaponSize);
    };

    get damage() {
        if (this.weapon.kind == 'cargo') {return 'N/A'}
        else if (this.weapon.kind == 'gun') {
            switch (this.weaponSize) {
                case 5: return '4d'; break;
                case 6: return '6d'; break;
                case 7: return '2dx5'; break;
                case 8: return '3dx5'; break;
                case 9: return '4dx5'; break;
                case 10: return '6dx5'; break;
                case 11: return '4dx10'; break;
                case 12: return '6dx10'; break;
                case 13: return '2dx50'; break;
                case 14: return '3dx50'; break;
                case 15: return '2dx100';
            }
        } else if (this.weapon.kind == 'missile') {
            switch (this.missileCaliber) {
                case 20: return '6dx5'; break;
                case 24: return '6dx6'; break;
                case 28: return '6dx7'; break;
                case 32: return '6dx8'; break;
                case 40: return '6dx10'; break;
                case 48: return '6dx12'; break;
                case 56: return '6dx14'; break;
                case 64: return '6dx16'; break;
                case 80: return '6dx20'; break;
                case 96: return '6dx24'; break;
                case 112: return '6dx28';
            }
        } else if (this.weapon.kind == 'beam') {
            let output = this.beamOutput;
            if (this.weapon.name == 'Antiparticle' || this.weapon.name == 'Plasma') {
                output = output * 10
            } else if (this.weapon.name == 'Graviton') {
                output = output / 10
            };
            switch (output / 1000000) {
                case 1: return '2d'; break;
                case 3: return '3d'; break;
                case 10: return '4d'; break;
                case 30: return '6d'; break;
                case 100: return '2dx5'; break;
                case 300: return '3dx5'; break;
                case 1000: return '4dx5'; break;
                case 3000: return '3dx10'; break;
                case 10000: return '4dx10'; break;
                case 30000: return '6dx10'; break;
                case 100000: return '2dx50'; break;
                case 300000: return '3dx50'; break;
                case 1000000: return '2dx100'; break;
                case 3000000: return '3dx100'; break;
                case 10000000: return '4dx100'; break;
                case 30000000: return '6dx100'; break;
                case 100000000: return '2dx500'; break;
                case 300000000: return '3dx500'; break;
                case 1000000000: return '2dx1000';
            }
        }
    };

    get acc() {
        if (this.weapon.kind == 'cargo') {return 'N/A'}
        else if (this.weapon.kind == 'gun') {
            let gc;
            if (this.gunCaliber <= 14) {gc = -9}
            else {gc = -8}
            if (this.weapon.name == 'Conventional Gun') {
                return gc
            } else if (this.weapon.name == 'Electromagnetic Gun') {
                return gc + 2
            } else {
                return -5
            }
        } else if (this.weapon.kind == 'missile') {
            if (this.weapon.name == 'Missile Launchers') {
                if (this.weapon.missileCaliber <= 28) {
                    return this.spaceship.tech_level - 8
                } else {return this.spaceship.tech_level - 7}
            } else if (this.weapon.name == 'Warp Missile Launchers') {
                if (this.weapon.missileCaliber <= 28) {
                    return 17
                } else {return 18}
            }
        } else if (this.weapon.kind == 'beam') {
            if (this.weapon.name.includes('Particle') || this.weapon.name.includes('Antiparticle')) {
                return -3
            } else if (this.weapon.name == 'Plasma') {
                return -6
            } else {return 0}
        }
    };

    get range() {
        if (this.weapon.kind == 'cargo') {return 'N/A'}
        else if (this.weapon.kind == 'gun') {
            if (this.weapon.name == 'Conventional Gun') {
                return 'C'
            } else {return 'S'}
        } else if (this.weapon.kind == 'missile') {
            if (this.weapon.name == 'Missile Launchers' && this.missileCaliber <= 28) {return 'L'} else {return 'X'}
        } else if (this.weapon.kind == 'beam') {
            let r0 = ['Plasma'];
            let r1 = ['Particle', 'Antiparticle', 'Ghost Particle', 'Graviton'];
            let r2 = ['Heat', 'Laser', 'Conversion', 'Disintegrator'];
            let r3 = ['X-Ray Laser', 'UV Laser', 'Graser'];
            let beamStep = 0;
            let bo = this.beamOutput / 100000;
            if (bo >= 1 && bo <= 10) {beamStep = 1}
            else if (bo > 10 && bo <= 300) {beamStep = 2}
            else if (bo > 300 && bo <= 3000) {beamStep = 3}
            else if (bo > 3000 && bo <= 100000) {beamStep = 4}
            else if (bo > 100000 && bo <= 3000000) {beamStep = 5}
            else if (bo > 3000000 && bo <= 100000000) {beamStep = 6}
            else if (bo > 100000000 && bo <= 3000000000) {beamStep = 7}
            else if (bo > 3000000000) {beamStep = 8};
            if (r1.includes(this.weapon.name)) {beamStep = beamStep + 1}
            else if (r2.includes(this.weapon.name)) {beamStep = beamStep + 2}
            else if (r2.includes(this.weapon.name)) {beamStem = beamStep + 3};
            switch (beamStep) {
                case 0: return 'P'; break;
                case 1: return 'P/C';break;
                case 2: return 'C';break;
                case 3: return 'C/S';break;
                case 4: return 'S';break;
                case 5: return 'S/L';break;
                case 6: return 'L';break;
                case 7: return 'L/X';break;
                default: return 'X';
            }
        }
    }

    get gunCaliber() {
        switch (this.weaponSize) {
            case 5: return 10; break;
            case 6: return 12; break;
            case 7: return 14; break;
            case 8: return 16; break;
            case 9: return 20; break;
            case 10: return 24; break;
            case 11: return 28; break;
            case 12: return 32; break;
            case 13: return 40; break;
            case 14: return 48; break;
            case 15: return 56;
        }
    };

    get missileCaliber() {
        return this.gunCaliber * 2;
    };

    get missileShots() {
        switch (this.weaponSize) {
            case 5: return 7; break;
            case 6: return 10; break;
            case 7: return 15; break;
            case 8: return 20; break;
            case 9: return 30; break;
            case 10: return 50; break;
            case 11: return 70; break;
            case 12: return 100; break;
            case 13: return 150; break;
            case 14: return 200; break;
            case 15: return 300;
        }
    };

    get gunShots() {
        return this.missileShots * 10
    };

    get shots() {
        if (this.weapon.kind == 'gun') {
            return this.gunShots
        } else if (this.weapon.kind == 'missile') {
            return this.missileShots
        } else {return 'N/A'}
    };

    get placement() {
        return placementList.find(function(placement) {return placement.id == this}, this.placement_id);
    };

    get weapon() {
        return weaponList.find(function(weapon) {return weapon.id == this}, this.weapon_id);
    };

    get true() {
        return this.weapon.name !== "Cargo"
    };

    get spaceship() {
        return this.placement.hull.spaceship
    };

    get weaponSize() {
        if (this.weapon.name.includes('Medium')) {
            return this.spaceship.size - 1;
        } else if (this.weapon.name.includes('Secondary')) {
            return this.spaceship.size - 2;
        } else if (this.weapon.name.includes('Tertiary')) {
            return this.spaceship.size - 3;
        } else {
            return this.spaceship.size;
        }
    }

};

let systemList = [];
let habitatList = [];
let weaponList = [];
let featureList = [];
let rulesList = [];

class System {
    constructor(id,
        name,
        tech_level,
        hull_placement,
        description,
        modifiers,
        size_min,
        size_max,
        cost,
        superscience,
        wspaces,
        high_energy,
        power_points,
        fuel,
        endurance,
        suppliable,
        volatile,
        delta_v
    ) {
        this.id = id;
        this.name = name;
        this.tech_level = tech_level;
        this.hull_placement = hull_placement;
        this.description = description;
        this.modifiers = modifiers;
        this.size_min = size_min;
        this.size_max = size_max;
        this.cost = cost;
        this.superscience = superscience;
        this.wspaces = wspaces;
        this.high_energy = high_energy;
        this.power_points = power_points;
        this.fuel = fuel;
        this.endurance = endurance;
        this.suppliable = suppliable;
        this.volatile = volatile;
        this.delta_v = delta_v;
        systemList.push(this);
    }
};

class Habitat {
    constructor(id, name, size, tech_level, superscience, modifiers, description, cost) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.tech_level = tech_level;
        this.superscience = superscience;
        this.modifiers = modifiers;
        this.description = description;
        this.cost = cost;
        habitatList.push(this);
    }
};

class Weapon {
    constructor(id, name, kind, tech_level, superscience, description, high_energy) {
        this.id = id;
        this.name = name;
        this.kind = kind;
        this.tech_level = tech_level;
        this.superscience = superscience;
        this.description = description;
        this.high_energy = high_energy;
        weaponList.push(this);
    }
};

class Feature {
    constructor(id, name, tech_level, modifiers, description, superscience, cost, size_min, size_max) {
        this.id = id;
        this.name = name;
        this.tech_level = tech_level;
        this.modifiers = modifiers;
        this.description = description;
        this.superscience = superscience;
        this.cost = cost;
        this.size_min = size_min;
        this.size_max = size_max;
        featureList.push(this)
    }
};

class Rule {
    constructor(id, name, superscience, modifiers, description) {
        this.id = id;
        this.name = name;
        this.superscience = superscience;
        this.modifiers = modifiers;
        this.description = description;
        rulesList.push(this)
    }
}

loadSystems();
loadWeapons();
loadHabitats();
loadRules();
loadFeatures();

function listSpaceships() {
    const list = document.getElementById('ship_list');
    list.innerHTML = '';
    let blank = document.createElement('option');
    blank.selected = 'selected';
    list.appendChild(blank);
    for (ship of spaceshipList) {
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
        let choice = spaceshipList.find(s => {return s.id == list.value});
        if (currentShip !== choice && !!choice) {displaySpaceship(choice)};
    })
};

function listSpaceship(ship) {
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

function addItems(name, list) {
    const html = document.getElementById(`${name}_list`);
    html.innerHTML = '';
    for (object of list) {
        if ((currentShip.superscience || !object.superscience) && 
        ((name == "features" && object.size_min <= currentShip.size && 
        object.size_max >= currentShip.size &&
        currentShip.tech_level >= object.tech_level) || name == "rules")) {
            let li = document.createElement('li');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${name}_${object.id}`;
            checkbox.name = object.name;
            checkbox.value = object.id;
            if (currentShip[name].includes(object)) {
                checkbox.checked = true
            };
            checkbox.addEventListener('click', () => {
                let arr = checkbox.id.split('_');
                if (arr[0] == "rules") {
                    changeShipRule(checkbox.value, checkbox.checked)
                } else {
                    changeShipFeature(checkbox.value, checkbox.checked)
                }
                updateStats();
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
                let thing = findRuleOrFeature(button.id);
                if (empty(thing.description)) {
                    loadDescription(name, thing.id)
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

function loadDescription(name, id) {
    if (name == 'rules') {name = 'switches'};
    fetch(`${BASE_URL}/${name}/${id}`)
    .then(resp => resp.json())
    .then(json => displayDescription(json, name))
};

function loadSystemDescription(system) {
    fetch(`${BASE_URL}/systems/${system.id}`)
    .then(resp => resp.json())
    .then(json => displayDescription(json, 'systems'))
};

function loadHabitatDescription(habitat) {
    fetch(`${BASE_URL}/habitats/${habitat.id}`)
    .then(resp => resp.json())
    .then(json => displayHabitatDescription(json))
};

function loadWeaponDescription(weapon) {
    fetch(`${BASE_URL}/weapons/${weapon.id}`)
    .then(resp => resp.json())
    .then(json => displayWeaponDescription(json))
};

function findRuleOrFeature(string) {
    let arr = string.split("_");
    if (arr[0] == 'features') {return featureList.find(f => {return f.id == parseInt(arr[1], 10)})}
    else {return rulesList.find(r => {return r.id == parseInt(arr[1], 10)})}
};

function displayDescription(json, name) {
    let object;
    if (name == 'switches') {object = rulesList.find(r => {return r.id == json.id})}
    else if (name == 'features') {object = featureList.find(f => {return f.id == json.id})}
    else {object = systemList.find(s => {return s.id == json.id})};
    object.description = json.description;
    document.getElementById("desc_name").innerText = object.name;
    document.getElementById("main_desc").innerText = object.description;
    document.getElementById('desc_window').style.visibility = 'visible';
};

function displayHabitatDescription(json) {
    let habitat = habitatList.find(h => {return h.name == json.name});
    habitat.description = json.description;
    document.getElementById("desc_name").innerText = habitat.name;
    document.getElementById("main_desc").innerText = habitat.description;
};

function displayWeaponDescription(json) {
    let weapon = weaponList.find(w => {return w.name == json.name});
    weapon.description = json.description;
    document.getElementById("desc_name").innerText = weapon.name;
    document.getElementById("main_desc").innerText = weapon.description;
};

function displaySpaceship(ship) {
    currentShip = ship;
    updateSpaceship();
    document.getElementById('rules').style.visibility = 'visible';
    document.getElementById('ship').style.visibility = 'visible';
    document.getElementById('stat_block').style.visibility = 'visible';
};

let currentShip;

function changeShipStat(stat, bool) {
    currentShip[stat] = bool
};

function changeShipRule(id, bool) {
    if (bool) {currentShip.rule_ids.push(parseInt(id, 10))}
    else {
        let i = currentShip.rule_ids.indexOf(parseInt(id, 10));
        delete currentShip.rule_ids[i];
    }
};

function changeShipFeature(id, bool) {
    if (bool) {currentShip.feature_ids.push(parseInt(id, 10))}
    else {
        let i = currentShip.feature_ids.indexOf(parseInt(id, 10));
        delete currentShip.feature_ids[i];
    }
};

function updateSpaceship() {
    updateRules();
    let name = document.getElementById('name');
    name.value = currentShip.name;
    let streamBox = document.getElementById('streamlined');
    streamBox.addEventListener('click', () => {
        changeShipStat(streamBox.id, streamBox.checked);
        updateSpaceship();
    });
    document.getElementById('streamlined').checked = currentShip.streamlined;
    let scienceBox = document.getElementById('superscience');
    scienceBox.addEventListener('click', () => {
        changeShipStat(scienceBox.id, scienceBox.checked);
        updateSpaceship();
    });
    document.getElementById('superscience').checked = currentShip.superscience;
    if (!!currentShip.tech_level) {document.getElementById(`tl${currentShip.tech_level}`).selected = "selected"};
    let techBox = document.getElementById('tech_level');
    techBox.addEventListener('change', () => {
        currentShip.tech_level = parseInt(techBox.value, 10);
        updateSpaceship();
    });
    if (!!currentShip.tech_level) {document.getElementById(`s${currentShip.size}`).selected = "selected"};
    let sizeBox = document.getElementById('size');
    sizeBox.addEventListener('change', () => {
        currentShip.size = parseInt(sizeBox.value, 10);
        updateSpaceship();
    });
    currentShip.placements.forEach(p => {
        if (!!p.system && ((!currentShip.superscience && p.system.superscience) || 
        p.system.size_min >= currentShip.size ||
        p.system.size_max <= currentShip.size || 
        p.system.tech_level >= currentShip.tech_level)) {
            p.system_id = null;
            p.habitatSpaces = [];
            p.weaponMounts = [];
        }
    });
    updateStats();
}

function updateRules() {
    currentShip.features.forEach(f => {
        if ((!currentShip.superscience && f.superscience) || 
        f.size_min >= currentShip.size ||
        f.size_max <= currentShip.size || 
        f.tech_level >= currentShip.tech_level) {
            let i = currentShip.feature_ids.indexOf(f);
            currentShip.feature_ids.splice(i, 1)
        }
    });
    currentShip.rules.forEach(r => {
        if (!currentShip.superscience && r.superscience) {
            let i = currentShip.rule_ids.indexOf(f);
            currentShip.rule_ids.splice(i, 1)
        }
    });
    addItems('rules', rulesList);
    addItems('features', featureList);
    populateSystems()
}

function updateStats() {
    let cost = document.getElementById('cost');
    let c = currentShip.cost;
    let d = c.toString().length;
    let l;
    if (d >= 13) {l = "T"} else if (d >= 10) {l = "B"} else if (d >= 7) {l = "M"} else if (d >= 4) {l = "K"} else {l = ""};
    cost.innerText = `$${c / (10 ** (d - 2))}${l}`;
    document.getElementById('dst').innerText = currentShip.dST;
    document.getElementById('hp').innerText = currentShip.dST;
    document.getElementById('ht').innerText = currentShip.HT;
    document.getElementById('hnd').innerText = currentShip.Hnd;
    document.getElementById('sr').innerText = currentShip.SR;
    let r = currentShip.range;
    if (r == Infinity) {r = 'c'} else {r = r.toString()};
    document.getElementById('g').innerText = `${currentShip.totalThrust}G`;
    document.getElementById('range').innerText = r;
    document.getElementById('weight').innerText = currentShip.loadWeight;
    document.getElementById('ddr').innerText = `${currentShip.front.armor}/${currentShip.center.armor}/${currentShip.rear.armor}`;
    document.getElementById('occ').innerText = `${currentShip.asv}ASV`;
    document.getElementById('load').innerText = currentShip.load;
    document.getElementById('air_accel').innerText = currentShip.airAccel;
    document.getElementById('air_move').innerText = currentShip.airMove;
    document.getElementById('air_hnd').innerText = currentShip.airHnd;
    document.getElementById('air_sr').innerText = currentShip.airSR
};

function buildMenu(hull, i, options) {
    let menu = document.getElementById(`${hull}_${i}`);
    menu.innerHTML = "";
    let blank = document.createElement('option');
    blank.id = `${hull}_${i}_blank`;
    blank.value = 0;
    blank.selected = "selected";
    menu.appendChild(blank);
    systemList.forEach(system => {
        if ((currentShip.superscience || !system.superscience) && 
        system.size_min <= currentShip.size &&
        system.size_max >= currentShip.size && 
        options.includes(system.hull_placement) && 
        system.tech_level <= currentShip.tech_level) {
            let option = document.createElement('option');
            option.value = system.id;
            option.id = (`${hull}_${i}_${system.id}`);
            option.innerText = system.name;
            if (!!currentShip[hull].location(i) && currentShip[hull].location(i).system == system) {
                option.selected = "selected"
            };
            menu.appendChild(option)
        }
    })
    menu.addEventListener('change', () => {
        if (menu.value !== 0) {
            let arr = menu.id.split('_');
            let v = menu.value;
            let place = currentShip[arr[0]].location(arr[1]);
            console.log(currentShip);
            place.system_id = parseInt(v, 10);
            updateStats();
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
            let thing = systemList.find(s => {return s.id == v});
            if (thing.name == "Habitat") {
                habitatWindow(currentShip[arr[0]].location(arr[1]))
            } else if (thing.name.includes('Weapons')) {
                weaponsWindow(currentShip[arr[0]].location(arr[1]))
            };
            if (empty(thing.description)) {
                loadSystemDescription(thing)
            } else {
                document.getElementById("desc_name").innerText = thing.name;
                document.getElementById("main_desc").innerText = thing.description;
                document.getElementById('desc_window').style.visibility = 'visible';
            }
        }
    })
    block.appendChild(button);
};

function blankCore(hull) {
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

function buildCoreMenu(section) {
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
    buildMenu(section, 0, ["any"])
};

function updateCores() {
    let cores = currentShip.placements.filter(p => {return p.location == 0});
    let hulls = ["front", "center", "rear"];
    cores.forEach(core => {
        buildCoreMenu(core.hull.section);
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
            blankCore(hull);
        })
    };
    rebuildCoreMenus();
};

function rebuildCoreMenus() {
    let core_checks = document.getElementsByClassName('core_checks');
    for (i = 0; i < core_checks.length; i++) {
        let check = core_checks[i];
        check.addEventListener('click', (e) => {
            let me = document.getElementById(e.toElement.id);
            let hull = e.toElement.id.split('_')[1];
            if (!!me.checked && !(!!currentShip[hull].location(0))) {
                let place = new Placement();
                place.hull_id = currentShip[hull].id;
                place.location = 0;
                if (!!currentShip[hull].location(0)) {
                    place.id = currentShip[hull].location(0).id;
                } else {
                    place.id = place.hull_id + place.location - 50
                };
                currentShip[hull].placements.push(place);
                placementList.push(place);
                buildCoreMenu(hull)
            } else if (!(!!me.checked)) {
                let i = currentShip[hull].placements.indexOf(currentShip[hull].location(0));
                currentShip[hull].placements.splice(i, 1)
            };
            updateStats();
            updateCores()
        })
    }
};

function populateSystems() {
    updateCores();
    hulls = ["front", "center", "rear"];
    hulls.forEach(hull => {
        let options = ["any", "hull"];
        for (i = 1; i <= 6; i++) {
            options.push(hull);
            buildMenu(hull, i, options);
        }
    });
    rebuildCoreMenus()
};

function closeButton() {
    let button = document.getElementById('desc_button');
    button.addEventListener('click', () => {
        document.getElementById('desc_window').style.visibility = 'hidden';
        document.getElementById('desc_name').innerText = '';
        document.getElementById('main_desc').innerText = '';
        document.getElementById('habitat_window').innerText = '';
        document.getElementById('weapon_window').innerText = '';
    })
};

function weaponsWindow(place) {
    let freeSpaces = place.weaponsSize - place.weaponMounts.length;
    let weaponHash = {};
    weaponList.forEach(weapon => {
        if (currentShip.superscience || !weapon.superscience) {
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
        let weapon = weaponList.find(w => {return w.id == id})
        let mount;
        if (count == 0) {
            mount = new WeaponMount();
            mount.placement_id = place.id;
            mount.weapon_id = weapon.id;
        } else {
            mount = weaponMountList.find(m => {return m.id == weaponHash[id][1]})
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
            let ment = placementList.find(p => {return p.id == arr[0]});
            if (input.value < arr[1]) {
                let lost = ment.weaponMounts.find(m => {return m.weapon.name == input.id});
                let i = ment.weaponMounts.indexOf(lost);
                ment.weaponMounts.splice(i, 1);
            } else {
                let gain = new WeaponMount();
                gain.id = Math.min.apply(Math, weaponMountList.map(m => {return m.id})) - 1
                gain.placement_id = ment.id;
                let weap = weaponList.find(w => {return w.name == input.id});
                gain.weapon_id = weap.id;
                ment.weaponMounts.push(gain);
                weaponMountList.push(gain);
            };
            weaponsWindow(ment);
            updateStats()
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
            let weap = weaponList.find(h => h.id == arr[1]);
            if (empty(weap.description)) {
                loadWeaponDescription(weap)
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

function habitatWindow(place) {
    let freeSpaces = place.habitatsSize - place.habitats.reduce(function(total, hab) {return total + hab.size}, 0);
    let habitatHash = {};
    habitatList.forEach(habitat => {
        if (currentShip.superscience || !habitat.superscience) {
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
            let ment = placementList.find(p => {return p.id == arr[0]});
            if (input.value < arr[1]) {
                let lost = ment.habitatSpaces.find(s => {return s.habitat.name == input.id});
                let i = ment.habitatSpaces.indexOf(lost);
                ment.habitatSpaces.splice(i, 1);
            } else {
                let gain = new HabitatSpace();
                gain.placement_id = ment.id;
                let hab = habitatList.find(h => {return h.name == input.id});
                gain.habitat_id = hab.id;
                ment.habitatSpaces.push(gain)
            };
            habitatWindow(ment);
            updateStats()
        });
        let button = document.createElement('a');
        button.href = '';
        button.id = `habitat_${key}_button`;
        button.classList.add('description');
        button.innerText = ' ⓘ';
        button.addEventListener("click", (e) => {
            e.preventDefault();
            let arr = button.id.split('_');
            let hab = habitatList.find(h => h.name == arr[1]);
            if (empty(hab.description)) {
                loadHabitatDescription(hab)
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

function newShip() {
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
        hullList.push(hull);
        for (i = 1; i <= 6; i++) {
            let place = new Placement(n, i, hull.id, null, null);
            hull.placements.push(place);
            placementList.push(place)
            n = n - 1;
        }
    });
    ship.superscience = false;
    ship.streamlined = false;
    ship.size = 5;
    ship.tech_level = 10;
    ship.name = 'New Ship';
    spaceshipList.push(ship);
    displaySpaceship(ship);
};

function saveShip() {
    currentShip.name = document.getElementById('name').value;
    if (currentShip.id <= 0) {
        currentShip.id = null;
        currentShip.hulls.forEach(h => {
            h.id = null;
            h.placements.forEach(p => {
                p.id = null;
                p.hull_id = null
            })
        });
        postSpaceship(currentShip);
    } else {
        currentShip.placements.forEach(p => {
            if (p.id <= 0) {p.id = null}
            p.weaponMounts.forEach(m => {
                if (m.id <= 0) {m.id = null}
            })
        });
        currentShip.hulls.forEach(h => {
            if (h.id <= 0) {h.id = null}
        })
        saveSpaceship(currentShip);
    }
};

function removeShip() {
    let ship = currentShip;
    currentShip = null;
    let e = document.getElementById(`ship_${ship.id}`);
    e.remove;
    deleteSpaceship(ship)
}

function newShipButton() {
    let button = document.getElementById('new');
    button.addEventListener('click', () => {newShip()})
};

function saveShipButton() {
    let button = document.getElementById('save');
    button.addEventListener('click', () => {saveShip()})
};

function removeShipButton() {
    let button = document.getElementById('delete');
    button.addEventListener('click', () => {removeShip()})
};

document.addEventListener("DOMContentLoaded", () => {
    loadSpaceships();
    closeButton();
    newShipButton();
    saveShipButton();
    removeShipButton()
});