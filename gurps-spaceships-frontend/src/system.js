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
}