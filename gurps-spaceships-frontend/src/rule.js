class Rule {
    constructor(id, name, superscience, modifiers, description) {
        this.id = id;
        this.name = name;
        this.superscience = superscience;
        this.modifiers = modifiers;
        this.description = description;
        Rule.list.push(this)
    };

    static list = []

}