class HabitatSpace {
    constructor(id, habitat_id, placement_id) {
        this.id = id;
        this.habitat_id = habitat_id;
        this.placement_id = placement_id;
    };

    static list = [];

    get placement() {
        return Placement.list.find(function(placement) {return placement.id == this}, this.placement_id);
    };

    get habitat() {
        return Habitat.list.find(function(habitat) {return habitat.id == this}, this.habitat_id);
    };

    get cost() {
        if (!!this.habitat.cost) {
            return this.habitat.cost
        } else {return 0}
    };

    get spaceship() {
        return this.placement.hull.spaceship
    }

}