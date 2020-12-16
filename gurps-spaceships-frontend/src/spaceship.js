class Spaceship {
    constructor(id, 
        name, 
        tech_level, 
        size, 
        streamlined, 
        superscience
    ) {
        this.id = id;
        this.name = name;
        this.tech_level  = tech_level;
        this.size = size;
        this.streamlined = streamlined;
        this.superscience = superscience;
        this.hulls_attributes = [],
        this.feature_ids = [],
        this.rule_ids = []
    };

    static list = [];

    static current = null;

    get hulls() {
        return this.hulls_attributes;
    };

    set hulls(newHulls) {
        this.hulls_attributes = newHulls;
    }

    get front() {
        return this.hulls.find(function(hull) {return hull.section === "front"});
    };

    get center() {
        return this.hulls.find(function(hull) {return hull.section === "center"});
    };

    get rear() {
        return this.hulls.find(function(hull) {return hull.section === "rear"});
    };

    get placements() {
        return [...this.front.placements, ...this.center.placements, ...this.rear.placements];
    };

    get systems() {
        return this.placements.map(function(placement) {return placement.system});
    };

    get features() {
        return Feature.list.filter(function(feature) {return this.feature_ids.includes(feature.id)}.bind(this))
    };

    get rules() {
        return Rule.list.filter(function(rule) {return this.rule_ids.includes(rule.id)}.bind(this))
    };

    get workspaces() {
        let base = this.placements.reduce(function(total, placement) {return total + placement.workspaces}, 0)
        if (!!this.features.filter(f => {return f.name == "High Automation".length})) {
            base = base / 10
        } else if (!!this.features.filter(f => {return f.name == "Total Automation"}).length) {
            base = 0
        };
        return base
    };

    get engineCost() {
        return this.placements.reduce(function(total, placement) {
            if (!!placement.system && placement.system.name.includes("Reaction Engine")) {
                return (total + placement.cost)
            } else {return total}
        }, 0)
    };

    get engineRoom() {
        return !!this.systems.filter(s => {
            if (!!s) {return s.name == "Engine Room"} else {return false}
        }).length
    };

    get featuresCost() {
        return this.features.reduce(function(total, feature) {
            if (!!feature.cost) {
                if (!!feature.cost["any"]) {
                    return total + feature.cost["any"]
                } else if (!!feature.cost.multiplier) {
                    switch (feature.cost.statistic) {
                        case "workspaces": 
                            return total + feature.cost.multiplier * this.workspaces;
                        break;
                        case "engine cost":
                            return total + feature.cost.multiplier * this.engineCost;
                        break;
                    }
                } else {
                    return total + App.progression(feature.cost, this.size)
                }
            } else {return 0}
        }.bind(this), 0)
    };

    get totalThrust() {
        return this.systems.reduce(function(total, system) {
            if (!!system && !!system.modifiers.thrust) {
                if (!!system.modifiers.thrust.any) {
                    return total + system.modifiers.thrust.any
                } else {
                    return total + system.modifiers.thrust[this.tech_level]
                }
            } else {return total}
        }.bind(this), 0.0)
    };

    get cost() {
        function totalCost(total, placement) {return (total + placement.cost)};
        return this.placements.reduce(totalCost, 0) + this.featuresCost;
    };

    get dST() {
        switch (this.size) {
            case 5: return 20; break;
            case 6: return 30; break;
            case 7: return 50; break;
            case 8: return 70; break;
            case 9: return 100; break;
            case 10: return 150; break;
            case 11: return 200; break;
            case 12: return 300; break;
            case 13: return 500; break;
            case 14: return 700; break;
            case 15: return 1000;
        }
    };

    get HT() {
        let ht = 13;
        if (!this.engineRoom && this.size >= 5 && this.size <= 9) {
            ht = ht - 1
        } else if (!!(this.features.filter(f => {return f.name.includes("Automation")}).length)  && this.tech_level <= 9) {
            ht = ht -1
        } else if (!!this.systems.filter(s => {if (!!s) {return ['Robofac', 'Fabricator', 'Nanofactory', 'Replicator'].includes(s.name)} else {return false}}).length) {ht = ht + 1};
        return ht;
    };

    get baseHnd() {
        switch (this.size) {
            case 5: return 0; break;
            case 6: return 0; break;
            case 7: return -1; break;
            case 8: return -1; break;
            case 9: return -1; break;
            case 10: return -2; break;
            case 11: return -2; break;
            case 12: return -2; break;
            case 13: return -3; break;
            case 14: return -3; break;
            case 15: return -3;
        }
    };

    hndOrSR(stat) {
        if (this.tech_level <= 8) {stat = stat - 1};
        if (this.totalThrust >= 1000.0) {stat = stat + 3} 
        else if (this.totalThrust >= 100.0) {stat = stat + 2}
        else if (this.totalThrust >= 10.0) {stat = stat + 1}
        else if (this.totalThrust >= 1.0) {}
        else if (this.totalThrust >= 0.1) {stat = stat - 1}
        else if (this.totalThrust >= 0.01) {stat = stat - 2}
        else {stat = stat - 3};
        return stat
    };

    get Hnd() {
        return this.hndOrSR(this.baseHnd)
    };

    get baseSR() {
        if (this.size <= 6) {return 4} else {return 5}
    };

    get SR() {
        return this.hndOrSR(this.baseSR)
    };

    get range() {
        if (!!this.systems.filter(s => {if (!!s) {return (s.name.includes("Reactionless") || (s.name == "Magsail") || (s.name == "Lightsail"))} else {return false}}).length) {
            return Infinity
        } else {
            let engine = this.systems.find(s => {if (!!s) {return s.name.includes("Reaction Engine")} else {return false}});
            if (!!engine) {
                let fuelTanks = this.placements.filter(p => {return !!p.system && p.system.name == "Fuel Tank"}).length;
                let deltaV
                if (!!engine.delta_v["any"]) {
                    deltaV = engine.delta_v["any"]
                } else {
                    deltaV = engine.delta_v[this.tech_level]
                }
                if (fuelTanks >= 6 && fuelTanks <= 8) {
                    deltaV = deltaV * 1.2
                } else if (fuelTanks >= 9 && fuelTanks <= 12) {
                    deltaV = deltaV * 1.4
                } else if (fuelTanks == 13 || fuelTanks == 14) {
                    deltaV = deltaV * 1.6
                } else if (fuelTanks == 15) {deltaV = deltaV * 1.8}
                else if (fuelTanks == 16) {deltaV = deltaV * 2}
                else if (fuelTanks == 17) {deltaV = deltaV * 2.2}
                else if (fuelTanks == 18) {deltaV = deltaV * 2.5}
                else if (fuelTanks == 19) {deltaV = deltaV * 3.0};
                return deltaV * fuelTanks
            } else {return 0}
        }
    };

    get loadWeight() {
        return App.progression({5: 30, 6: 100}, this.size)
    };

    occ(stat) {
        return this.placements.reduce(function(total, placement) {
            if (!!placement[stat]) {return total + placement[stat]} else {return total}
        }, 0)
    }

    get asv() {
        return this.occ("asv")
    };

    get sv() {
        return this.occ("sv")
    };

    get sleep() {
        return this.occ("sleep")
    };

    get cargo() {
        return this.placements.reduce(function(total, placement) {
            return total + placement.cargo
        }, 0)
    };

    get load() {return this.cargo + 0.1 * (this.asv + this.sv + this.sleep)};

    get forceField() {
        return this.systems.filter(s => {return !!s.modifiers.force_ddr}).reduce(function(total, system) {
            return total + system.modifiers.force_ddr[this.tech_level][this.size]
        }.bind(this), 0)
    };

    get ftl() {
        return this.systems.filter(s => {return !!s.modifiers.ftl}).reduce(function(total, system) {
            return total + system.modifiers.ftl
        }.bind(this), 0)
    }

    get airThrust() {
        let aThrust;
        let arr = this.systems.filter(s => {if (!!s) {return !!s.modifiers.atmospheric_thrust} else {return false}})
        if (App.empty(arr)) {aThrust = 0} else {aThrust = arr.reduce(function(total, system) {
            return total + system.modifiers.atmospheric_thrust
        }.bind(this))};
        return aThrust + this.totalThrust;
    };

    get airAccel() {
        return this.airThrust * 10;
    }

    get airMove() {
        let s;
        if (this.streamlined) {s = 2500} else {s = 250};
        return Math.round((Math.sqrt(this.airThrust) * s) / 100) * 100;
    };

    get airHnd() {
        let ah = this.Hnd;
        if (!!this.systems.find(s => {if (!!s) {return s.modifiers.contragravity} else {return false}})) {
            ah = ah + 2
        };
        if (!!this.features.find(f => {return f.name == "Winged"})) {
            ah = ah + 4
        };
        if (ah > 5) {ah = 5};
        return ah
    };

    get airSR() {
        if (!!this.features.find(f => {return f.name == "Winged"})) {
            return this.SR + 1;
        } else {return this.SR}
    }

}