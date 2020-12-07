const BASE_URL = "http://localhost:3000";

function objectToInstance(object, klass) {
    let instance = new klass();
    Object.keys(object).forEach(function(key) {instance[key] = object[key];});
    return instance;
};

function makeSpaceship(object) {
    let ship = new Spaceship();
    Object.keys(object).forEach(function(key) {
        if (object[key] != null && object[key].constructor != Array) {
            ship[key] = object[key]
    }});
    object.hulls.forEach(function(hull) {ship.hulls_attributes.push(makeHull(hull))});
    object.features.forEach(function(feature) {ship.feature_ids.push(feature.id)});
    object.switches.forEach(function(rule) {ship.switch_ids.push(rule.id)});
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

function loadSwitches() {
    fetch(`${BASE_URL}/switches`)
    .then(resp => resp.json())
    .then(json => parseSwitches(json));
};

function loadSpaceship(id) {
    fetch(`${BASE_URL}/spaceships/${id}`)
    .then(resp => resp.json())
    .then(json => makeSpaceship(json))
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
    fetch(`${BASE_URL}/spaceships`, configObj);
}

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

function parseSwitches(switchData) {
    for (rule of switchData) {
        objectToInstance(rule, System)
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
        this.switch_ids = []
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
        return featureList.filter(function(feature) {return this.feature_ids.include(feature.id)}.bind(this))
    };

    get switches() {
        return switchList.filter(function(rule) {return this.switch_ids.include(rule.id)}.bind(this))
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
            if (placement.name.includes("Reaction Engine")) {
                return (total + placement.cost)
            } else {return total}
        }, 0)
    };

    get engineRoom() {
        !!this.systems.filter(s => {return s.name == "Engine Room"}).length
    };

    get featuresCost() {
        return this.features.reduce(function(total, feature) {
            if (!!feature.cost) {
                if (!!feature.cost["any"]) {
                    return total + feature.cost["any"]
                } else if (!!feature.cost.multiplier) {
                    switch (feature.cost.statistic) {
                        case "workspaces": 
                            return feature.cost.multiplier * this.workspaces;
                        break;
                        case "engine cost":
                            return feature.cost.multiplier * this.engineCost;
                        break;
                    }
                } else {
                    return progression(feature.cost, this.size)
                }
            } else {return 0}
        }.bind(this), 0)
    };

    get totalThrust() {
        return this.systems.reduce(function(total, system) {
            if (!!system.modifiers.thrust) {
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
        return this.placements.reduce(totalCost, 0) + this.featuresCost
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
        } else if (!!(this.systems.filter(s => {return (!!s.modifiers.dollars_per_hour || !!s.modifiers.pounds_per_hour)}))) { ht = ht + 1};
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
        else if (this.totalThrust < 1.0 && this.totalThrust >= 0.1) {stat = stat - 1}
        else if (this.totalThrust >= 0.01) {stat = stat - 2}
        else {stat = stat - 3};
        return stat
    };

    get Hnd() {
        return hndOrSR(this.baseHnd)
    };

    get baseSR() {
        if (this.size <= 6) {return 4} else {return 5}
    };

    get SR() {
        return hndOrSR(this.baseSR)
    };

    get range() {
        if (!!this.systems.filter(s => {return (s.name.includes("Reactionless") || (s.name == "Magsail") || (s.name == "Lightsail"))}).length) {
            return Infinity
        } else {
            let engine = this.systems.find(s => {return s.name.includes("Reaction Engine")});
            let fuelTanks = this.placements.filter(p => p.fuel == engine.fuel).length;
            let deltaV
            if (!!engine.modifiers.delta_v["any"]) {
                deltaV = engine.modifiers.delta_v["any"]
            } else {
                deltaV = engine.modifiers.delta_v[this.tech_level]
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
        }
    };

    get loadWeight() {
        return progression({5: 30, 6: 100}, this.size)
    };

    occ(stat) {
        return this.placements.reduce(function(total, placement) {return total + placement[stat]}, 0)
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
        }.bind(this))
    };

    get airThrust() {
        let aThrust;
        this.systems.filter(s => {return !!s.modifiers.atmospheric_thrust}).reduce(function(total, system) {
            aThrust = total + system.modifiers.atmospheric_thrust
        }.bind(this));
        return aThrust + this.totalThrust;
    };

    get airAccel() {
        return airThrust * 10;
    }

    get airMove() {
        let s;
        if (this.streamlined) {s = 2500} else {s = 250};
        return Math.round((Math.sqrt(this.airThrust) * s) * 100) / 100;
    };

    get airHnd() {
        let ah = this.Hnd;
        if (!!this.systems.find(s => {return s.modifiers.contragravity})) {
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
            if (system.modifiers[sa]) {
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

    get spaceship() {
        return this.hull.spaceship
    };

    get size() {
        return this.spaceship.size
    };

    get workspaces() {
        if (this.system.wspaces && this.size >= 10) {
           switch (this.size) {
               case 10: return 1; break;
               case 11: return 3; break;
               case 12: return 10; break;
               case 13: return 30; break;
               case 14: return 100; break;
               case 15: return 300;
           }
        } else if (this.system.name == "Engine Room") {
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
        return this.habitatSpaces.map(function(space) {return space.habitat})
    };

    get weaponMounts() {
        return this.weapon_mounts_attributes;
    };

    get habitatsSize () {
        let spaces = this.system.modifiers.habitat_spaces;
        let size = this.spaceship.size;
        if (spaces) {
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
        if (this.system.modifiers.weapons) {
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
        let base = progression(this.system.cost, this.spaceship.size);
        if (!empty(this.weaponMounts)) {
            return (base * (this.trueWeapons / this.weaponMounts.length))
        } else if (!empty(this.habitatSpaces)) {
            return (this.extraHabitatCost + base)
        } else {return base}
    };

    get asv () {
        if (!!this.habitatSpaces.length) {
            return this.habitatSpaces.filter(s => {
                return s.modifiers.asv
            }).reduce(function(total, space) {return total + space.modifiers.asv}, 0)
        } else {return 0}
    };

    get sv () {
        if (!!this.system.modifiers.sv) {
            return progression(this.system.modifiers.sv, this.size)
        } else {return 0};
    };

    get sleep () {
        if (!!this.habitatSpaces.length) {
            return this.habitatSpaces.filter(s => {
                return s.modifiers.sleep
            }).reduce(function(total, space) {return total + space.modifiers.sleep}, 0)
        } else {return 0}
    };

    get cargo() {
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
    }

};

let systemList = [];
let habitatList = [];
let weaponList = [];
let featureList = [];
let switchList = [];

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

class Switch {
    constructor(id, name, superscience, modifiers, description) {
        this.id = id;
        this.name = name;
        this.superscience = superscience;
        this.modifiers = modifiers;
        this.description = description;
        switchList.push(this)
    }
}

loadSystems();
loadWeapons();
loadHabitats();
loadSwitches();
loadFeatures();

document.addEventListener("DOMContentLoaded", () => {
});