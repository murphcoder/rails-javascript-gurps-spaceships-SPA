class Weapon {
    constructor(id, name, kind, tech_level, superscience, description, high_energy) {
        this.id = id;
        this.name = name;
        this.kind = kind;
        this.tech_level = tech_level;
        this.superscience = superscience;
        this.description = description;
        this.high_energy = high_energy;
        Weapon.list.push(this);
    };

    static list = []

}