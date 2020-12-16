class WeaponMount {
    constructor(id, weapon_id, placement_id, kind) {
        this.id = id;
        this.weapon_id = weapon_id;
        this.placement_id = placement_id;
        this.kind = kind;
    };

    static list = [];

    get beamOutput() {
        return App.progression({5: 10000000, 6: 30000000}, this.weaponSize);
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
        return Placement.list.find(function(placement) {return placement.id == this}, this.placement_id);
    };

    get weapon() {
        return Weapon.list.find(function(weapon) {return weapon.id == this}, this.weapon_id);
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

}