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
    return placement;
};

function makeHabitatSpace(habitatSpace) {
    let object = objectToInstance(habitatSpace, HabitatSpace);
    return object;
};

function makeWeaponMount(weaponMount) {
    let object = objectToInstance(weaponMount, WeaponMount);
    return object;
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

let spaceshipList = [];

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
        this.features = [],
        this.switches = []
    };

    get hulls() {
        return this.hulls_attributes;
    }
};

class Hull {
    constructor(id, section, spaceship_id) {
        this.id = id;
        this.section = section;
        this.spaceship_id = spaceship_id;
        this.placements_attributes = [];
    };
};

class Placement {
    constructor(id, location, hull_id, system_id, fuel) {
        this.id = id;
        this.location = location;
        this.hull_id = hull_id;
        this.system = system_id;
        this.fuel = fuel;
        this.habitat_spaces_attributes = [];
        this.weapon_mounts_attributes = []
    }
};

class HabitatSpace {
    constructor(id, habitat_id, placement_id) {
        this.id = id;
        this.habitat = habitatList.find(function(habitat) {return habitat.id == this}, habitat_id);
        this.placement_id = placement_id;
    }
};

class WeaponMount {
    constructor(id, weapon_id, placement_id, kind) {
        this.id = id;
        this.weapon = weaponList.find(function(weapon) {return weapon.id == this}, weapon_id);
        this.placement_id = placement_id;
        this.kind = kind;
    }
};

let systemList = [];
let habitatList = [];
let weaponList = [];

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

loadSystems();
loadWeapons();
loadHabitats();

document.addEventListener("DOMContentLoaded", () => {
});