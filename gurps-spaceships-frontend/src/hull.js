class Hull {
    constructor(id, section, spaceship_id) {
        this.id = id;
        this.section = section;
        this.spaceship_id = spaceship_id;
        this.placements_attributes = [];
    };

    static list = [];

    get spaceship() {
        return Spaceship.list.find(function(ship) {return ship.id == this}, this.spaceship_id);
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
}