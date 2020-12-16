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
        Habitat.list.push(this);
    };

    static list = []
}