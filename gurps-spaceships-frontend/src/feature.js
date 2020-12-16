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
}