class Spaceship {
    constructor(ship) {
        this.id = ship.id;
        this.name = ship.name;
        this.tech_level = ship.tech_level;
        this.size = ship.size;
        this.steamlined = ship.streamlined;
        this.superscience = ship.superscience;
        this.user_id = ship.user_id;
        this.created_at = ship.created_at;
        this.updated_at = ship.updated_at;
        this.hulls = ship.hulls.map(function(hull) {return new Hull(hull, this)}.bind(this));
        this.features = ship.features.map(function(feature) {return feature.id});
        this.switches = ship.switches.map(function(rule) {return rule.id});
        this.constructor.all.push(this);
    };
}

Spaceship.all = [];

class Hull {
    constructor(hull, spaceship) {
        this.section = hull.section;
        this.spaceship = spaceship;
        this.placements = hull.placements.map(function(placement) {return new placement(placement, this)}.bind(this));
    }
}

Hull.all = [];

