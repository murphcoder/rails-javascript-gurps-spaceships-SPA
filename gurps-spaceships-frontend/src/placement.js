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
}