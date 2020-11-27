# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

systems = [
    {
        name: "Armor, Ice",
        tech_level: 0, 
        location: "hull", 
        modifiers: {
            us_ddr: {8 => 1, 9 => 2, 10 => 2, 11 => 3, 12 => 5, 13 => 7, 14 => 10, 15 => 15}
        },
        description: 'This is armor made from frozen water. It may be used to represent spacecraft built from hollowed-out comets or Kuiper Belt objects, although ice is sometimes added atop other armor as cheap shielding for space stations. Ice armor systems provide semi-ablative dDR that protects the hull section it is installed in. Ice armor is not available for SM+5 to SM+7 hulls, nor for streamlined hulls. Cost is negligible.',
        size_min: 8
    },

    {
        name: "Armor, Stone",
        tech_level: 0,
        location: "hull",
        modifiers: {
            us_ddr: {7 => 1, 8 => 2, 9 => 2, 10 => 3, 11 => 5, 12 => 7, 13 => 10, 14 => 15, 15 => 20}
        },
        description: "This is rock armor for vessels that are hollowed-out asteroids, or covered with a layer of rock or slag. Stone dDR is semi-ablative. It is unavailable for SM+5-6 hulls, or for streamlined hulls. Cost is negligible.",
        size_min: 7
    },

    {
        name: "Armor, Steel",
        tech_level: 7,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 1, 6 => 2, 7 => 3, 8 => 5, 9 => 7, 10 => 10, 11 => 15, 12 => 20, 13 => 30, 14 => 50, 15 => 70},
            sl_ddr: {6 => 1, 7 => 2, 8 => 3, 9 => 5, 10 => 7, 11 => 10, 12 => 15, 13 => 20, 14 => 30, 15 => 50}
        },
        description: "This is armor made of high-quality steel plate. It is common due to its low cost.",
        cost: {5 => 6000, 6 => 20000}
    },

    {
        name: "Armor, Light Alloy",
        tech_level: 7,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 2, 6 => 3, 7 => 5, 8 => 7, 9 => 10, 10 => 15, 11 => 20, 12 => 30, 13 => 50, 14 => 70, 15 => 100},
            sl_ddr: {5 => 1, 6 => 2, 7 => 3, 8 => 5, 9 => 7, 10 => 10, 11 => 15, 12 => 20, 13 => 30, 14 => 50, 15 => 70}
        },
        description: "This is armor made of aerospace-grade aluminum or titanium alloys.",
        cost: {5 => 15000, 6 => 50000}
    },

    {
        name: "Armor, Metallic Laminate",
        tech_level: 8,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 3, 6 => 5, 7 => 7, 8 => 10, 9 => 15, 10 => 20, 11 => 30, 12 => 50, 13 => 70, 14 => 100, 15 => 150},
            sl_ddr: {5 => 2, 6 => 3, 7 => 5, 8 => 7, 9 => 10, 10 => 15, 11 => 20, 12 => 30, 13 => 50, 14 => 70, 15 => 100}
        },
        description: "This is titanium, aluminum, beryllium, or ultra-hard steel alloy further reinforced by the addition of carbon fibers, ceramic fibers, or intermetallic laminates.",
        cost: {5 => 30000, 6 => 100000}
    },

    {
        name: "Armor, Advanced Metallic Laminate",
        tech_level: 9,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 5, 6 => 7, 7 => 10, 8 => 15, 9 => 20, 10 => 30, 11 => 50, 12 => 70, 13 => 100, 14 => 150, 15 => 200},
            sl_ddr: {5 => 3, 6 => 5, 7 => 7, 8 => 10, 9 => 15, 10 => 20, 11 => 30, 12 => 50, 13 => 70, 14 => 100, 15 => 150}
        },
        description: "This is armor similar to metallic laminate, but the alloy is reinforced through the addition of super-strong carbon nanotubes, boron nanotubes, or diamond whiskers.",
        cost: {5 => 60000, 6 => 200000}
    },

    {
        name: "Armor, Nanocomposite",
        tech_level: 10,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 7, 6 => 10, 7 => 15, 8 => 20, 9 => 30, 10 => 50, 11 => 70, 12 => 100, 13 => 150, 14 => 200, 15 => 300},
            sl_ddr: {5 => 5, 6 => 7, 7 => 10, 8 => 15, 9 => 20, 10 => 30, 11 => 50, 12 => 70, 13 => 100, 14 => 150, 15 => 200}
        },
        description: "This armor uses ultra-strength carbon or boron nanotube-reinforced polymers. It can also represent biotech hulls far stronger than the organic hull covered below.",
        cost: {5 => 150000, 6 => 500000}
    },

    {
        name: "Armor, Organic",
        tech_level: 10,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 2, 6 => 3, 7 => 5, 8 => 7, 9 => 10, 10 => 15, 11 => 20, 12 => 30, 13 => 50, 14 => 70, 15 => 100},
            sl_ddr: {5 => 1, 6 => 2, 7 => 3, 8 => 5, 9 => 7, 10 => 10, 11 => 15, 12 => 20, 13 => 30, 14 => 50, 15 => 70}
        },
        description: "This is low-cost armor made of advanced biotech materials (space-adapted wood or living tissue, living bioplastic, etc.) Use this for spacecraft with living or high-biotech wood hulls. DR is halved (round down) against burning or corrosion damage. TL11 if engineered or manufactured rather than found (e.g., the body or wood of a space life form).",
        cost: {5 => 10000, 6 => 30000}
    },

    {
        name: "Armor, Diamondoid",
        tech_level: 11,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 10, 6 => 15, 7 => 20, 8 => 30, 9 => 50, 10 => 70, 11 => 100, 12 => 150, 13 => 200, 14 => 300, 15 => 500},
            sl_ddr: {5 => 7, 6 => 10, 7 => 15, 8 => 20, 9 => 30, 10 => 50, 11 => 70, 12 => 100, 13 => 150, 14 => 200, 15 => 300}
        },
        description: "This armor system uses super-hard nano-fabricated materials such as diamondoid, ultra-hard fullerites, or cubic boron nitride. Can also represent exotic superscience “crystal” armors.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Armor, Exotic Laminate",
        tech_level: 12,
        location: "hull",
        modifiers: {
            us_ddr: {5 => 15, 6 => 20, 7 => 30, 8 => 50, 9 => 70, 10 => 100, 11 => 150, 12 => 200, 13 => 300, 14 => 500, 15 => 700},
            sl_ddr: {5 => 10, 6 => 15, 7 => 20, 8 => 30, 9 => 50, 10 => 70, 11 => 100, 12 => 150, 13 => 200, 14 => 300, 15 => 500}
        },
        description: "Tougher armor than diamondoid, usually a complex laminate of ultra-hard materials and high-density exotic matter.",
        cost: {5 => 600000, 6 => 2000000}
    },

    {
        name: "Cargo Hold",
        modifiers: {cargo: {5 => 1.5, 6 => 5}},
        description: "This is ordinary cargo space. Each system is rated for tons of cargo capacity. The design table shows the capacity of cargo space. Cost is negligible."
    },

    {
        name: "Cloaking Device",
        superscience: true,
        modifiers: {cloak: true},
        high_energy: 1,
        description: "This is a superscience, energy-intensive stealth system that makes the vessel invisible to vision and to active and passive imaging sensors. The vessel can be detected if it fires weapons or uses a reaction drive. A spacecraft using a cloaking device is -10 to be detected by sensors. During space combat, cloaking devices are activated when power is allocated to them.",
        cost: {5 => 1000000, 6 => 3000000}
    },

    {
        name: "Contragravity Lifter",
        superscience: true,
        modifiers: {contragravity: true},
        high_energy: 1,
        description: "Many contragravity systems are treated as reactionless drives. This system works differently: it selectively nullifies some or all of the pull of gravity on the spacecraft, but does not actually provide any acceleration. A spacecraft with contragravity lifters can land on, or take off from, a world regardless of its gravity. The lifter will cancel up to 10G, enough to take off from all normal or gas giant planets.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Control Room",
        modifiers: {
            complexity: {5 => 6, 6 => 7, 7 => 7, 8 => 8, 9 => 8, 10 => 9, 11 => 9, 12 => 10, 13 => 10, 14 => 11, 15 => 11},
            comm_sensor: {5 => -6, 6 => -5, 7 => -4, 8 => -3, 9 => -2, 10 => -1, 11 => 0, 12 => 1, 13 => 2, 14 => 3, 15 => 4},
            control_stations: {5 => 1, 6 => 2, 7 => 3, 8 => 4, 9 => 6, 10 => 10, 11 => 15, 12 => 20, 13 => 30, 14 => 40, 15 => 60}
        },
        description: "All spacecraft capable of maneuvering require a control room; multi-stage spacecraft only need this in the uppermost stage. Although the system includes the actual control room and computer systems, most of the mass and cost, especially on large spacecraft, is devoted to systems distributed about the vessel’s hull: a basic comm/sensor array for navigation, and the attitude thrusters or gyros used to alter facing.",
        cost: {5 => 60000, 6 => 200000}
    },

    {
        name: "Defensive ECM",
        tech_level: 7,
        modifiers: {defensive_ecm: 1},
        description: "An array of automatic self-defense jamming antenna, decoy systems, etc. that protects the spacecraft from being hit by enemy fire. Each system gives a -2 to ranged attacks against the vessel. No more than three can be installed. It only applies if the defensive ECM system is of the same or higher TL as the spacecraft or missile targeting it.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Engine Room",
        modifiers: {engine_room: true, control_stations: 1},
        description: "Small spacecraft (SM+5 to SM+9) whose crew wish to per- form repairs and maintenance without exiting the vehicle should have an engine room system. An engine room includes room, tools, and parts sufficient to maintain and repair the craft. It isn’t required on an SM+5-9 craft, but lacking one low- ers HT and makes repairs harder. An engine room comes with one control station. An engine room should be placed in the same or adjacent hull section as the majority of the drives or power plants. SM+10 or larger spacecraft do not require an engine room sys- tem, since all systems that require maintenance include work- spaces integral to them (manned by their listed tech crew requirement).",
        cost: {5 => 15000, 6 => 30000, 7 => 100000, 8 => 300000, 9 => 1000000},
        size_max: 9
    },

    {
        name: "Enhanced Array",
        tech_level: 7,
        location: "hull",
        modifiers: {comm_sensor_bonus: 2},
        description: "A larger and more capable version of the basic array that comes with a control room system.",
        cost: {5 => 60000, 6 => 200000}
    },

    {
        name: "Science Array",
        tech_level: 7,
        location: "hull",
        modifiers: {comm_sensor_bonus: 2},
        description: "Incorporates highly sensitive instruments for use in astronomical and physics surveys, as well as the same equipment as an enhanced array.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Tactical Array",
        tech_level: 7,
        location: "hull",
        modifiers: {comm_sensor_bonus: 2},
        description: "Has the same capabilities as an enhanced array, but adds the ability to actively jam transmissions and overcome defensive ECM.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Multipurpose Array",
        tech_level: 7,
        location: "hull",
        modifiers: {comm_sensor_bonus: 2},
        description: "Combines science and tactical array functions.",
        cost: {5 => 600000, 6 => 2000000}
    },

    {
        name: "External Clamp",
        tech_level: 7,
        location: "hull",
        modifiers: {clamp: true},
        description: "This is a system of clamps or grapples that allows the vessel to attach itself to another spacecraft or object that the vessel has rendezvoused with. Attachment takes at least 20 seconds; the subject must be cooperative or drifting. A clamped space- craft can be towed or pushed. To determine performance, calculate the tons of thrust. A vessel’s tons of thrust are equal to its acceleration (or FTL rating) times its mass. If it pulls or pushes a vessel or other heavy object (such as an asteroid) divide by their combined mass to get the new acceleration or rating. The two vessels may also combine their acceleration or FTL ratings: add their thrust or FTL rating together before dividing by combined mass.",
        cost: {5 => 3000, 6 => 10000}
    },

    {
        name: "Fabricator",
        tech_level: 8,
        high_energy: 1,
        modifiers: {dollars_per_hour: {5 => 1500, 6 => 5000}, ht_bonus: 1},
        description: "A high-tech machine shop. Requires component parts equal in mass and costing 40% of the good’s value.",
        cost: {5 => 1500000, 6 => 5000000},
        size_min: 6
    },

    {
        name: "Robofac",
        tech_level: 10,
        high_energy: 1,
        modifiers: {dollars_per_hour: {5 => 3000, 6 => 10000}, ht_bonus: 1},
        description: "A fabricator, but faster and capable of self-operation with its own Machinist-14 skill.",
        cost: {5 => 3000000, 6 => 10000000},
        size_min: 6
    },

    {
        name: "Nanofactory",
        tech_level: 11,
        high_energy: 1,
        modifiers: {dollars_per_hour: {5 => 30000, 6 => 100000}, ht_bonus: 1},
        description: "A “cornucopia” capable of manufacturing goods from raw materials (carbon, metals, etc.). Requires only an equivalent mass in raw materials.",
        cost: {5 => 6000000, 6 => 20000000},
        size_min: 6
    },

    {
        name: "Replicator",
        tech_level: 12,
        superscience: true,
        high_energy: 1,
        modifiers: {pounds_per_hour: {5 => 0.5, 6 => 1.5}, ht_bonus: 1},
        description: "A nuclear synthesis machine capable of transforming one element into another, and creating goods from transmutation of bulk matter. The table shows the pounds of goods each system can replicate per hour from an equivalent mass of bulk matter (which can be stored as cargo or fuel).",
        cost: {5 => 30000000, 6 => 100000000},
        size_min: 6
    },

    {
        name: "Light Force Screen",
        tech_level: 11,
        superscience: true,
        high_energy: 1,
        modifiers: {
            force_ddr: {
                tech_level: {
                    11 => {
                        5 => 20, 6 => 30, 7 => 50, 8 => 70, 9 => 100, 10 => 150, 11 => 200, 12 => 300, 13 => 500, 14 => 700, 15 => 1000
                    },
                    12 => {
                        5 => 30, 6 => 50, 7 => 70, 8 => 100, 9 => 150, 10 => 200, 11 => 300, 12 => 500, 13 => 700, 14 => 1000, 15 => 1500
                    }
                }
            }
        },
        description: "This system generates a protective force field around the entire vessel – it protects all hull sections, not just the one it is installed in. It is rated for the semi-ablative dDR that it provides. The table shows the field’s dDR and the cost per (high-energy) system. Subtract force screen dDR first, then any armor dDR on the hull section struck. A force screen regenerates 10% of its lost dDR every second, provided it is powered up. During space combat turns (which represent several seconds to several minutes) the screen is assumed to completely regenerate lost dDR each turn, but it offers reduced protection against repeated attacks during the turn. A spacecraft may only have one force screen up at any one time.",
        cost: {5 => 500000, 6 => 1500000}
    },

    {
        name: "Heavy Force Screen",
        tech_level: 11,
        superscience: true,
        high_energy: 2,
        modifiers: {
            force_ddr: {
                tech_level: {
                    11 => {
                        5 => 40, 6 => 60, 7 => 100, 8 => 140, 9 => 200, 10 => 300, 11 => 400, 12 => 600, 13 => 1000, 14 => 1400, 15 => 2000
                    },
                    12 => {
                        5 => 60, 6 => 100, 7 => 140, 8 => 200, 9 => 300, 10 => 400, 11 => 600, 12 => 1000, 13 => 1400, 14 => 2000, 15 => 3000
                    }
                }
            }
        },
        description: "This system generates a protective force field around the entire vessel – it protects all hull sections, not just the one it is installed in. It is rated for the semi-ablative dDR that it provides. The table shows the field’s dDR and the cost per (high-energy) system. Subtract force screen dDR first, then any armor dDR on the hull section struck. A force screen regenerates 10% of its lost dDR every second, provided it is powered up. During space combat turns (which represent several seconds to several minutes) the screen is assumed to completely regenerate lost dDR each turn, but it offers reduced protection against repeated attacks during the turn. A spacecraft may only have one force screen up at any one time. As a heavy force screen, this system may function as a light screen, or it can double the dDR by using a second Power Point to reinforce the field.",
        cost: {5 => 1500000, 6 => 5000000}
    },

    {
        name: "Fuel Tank",
        modifiers: {fuel_tank: 1},
        description: "This is a full tank of reaction mass for a reaction drive. A spacecraft with one or more reaction drive engines requires at least one fuel tank with appropriate reaction mass to supply those drives. The more fuel tanks that can supply a particular reaction drive, the greater the ship’s delta-V, as indicated in each reaction drive engine description.",
        cost: {5 => 10000, 6 => 30000}
    },

    {
        name: "Habitat",
        modifiers: {habitat_spaces: {6 => 4, 7=> 8, 8 => 24}},
        description: "Provides living quarters and extended life support for space- craft crew during long voyages. A habitat includes a pressurized hull, radiation shielding, and a variety of standard features such as airlocks, hatches, compartmentalization, and elevators. It can contain several different types of facilities.",
        cost: {5 => 30000, 6 => 100000},
        size_min: 6
    },

    {
        name: "Hangar Bay",
        modifiers: {hangar_capacity: {5 => 1, 6 => 3}, launch_rate: {5 => 1, 6 => 3, 7 => 10, 8 => 20, 9 => 50, 10 => 100, 11 => 200, 12 => 500, 13 => 1000, 14 => 2000, 15 => 5000}},
        description: "A bay capable of storing, launching, and retrieving other vehicles (spacecraft, trucks, etc.). Hangar bays can also be used for cargo, but are less mass-efficient than a cargo hold, due to the other facilities installed in the bay. Hangar bays include airlock systems so they can be depressurized without spilling the vessel’s air. A hangar bay can also be flooded and used launch watercraft or submarines.",
        cost: {5 => 3000, 6 => 10000}
    },

    {
        name: "Jet Engine",
        tech_level: 7,
        location: "rear",
        modifiers: {atmospheric_thrust: 1},
        description: "This is a turbo ramjet or scramjet engine that functions only in an atmosphere containing oxygen with at least 0.1 atmos- pheres pressure. Each jet engine provides 1G acceleration for calculating atmospheric speed, and consumes one fuel tank worth of jet fuel per half-hour (TL7) or hour (TL8+). Use Piloting (Aerospace) skill to control the vessel when flying in atmosphere.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Jump Gate",
        superscience: true,
        location: "hull",
        high_energy: 1,
        modifiers: {jump_capacity: {9 => 100, 10 => 300}},
        description: "This is one side of an artificial wormhole portal that connects to another distant jump gate, usually permitting instant FTL transit. This may be a prerequisite for, or alternative to, stardrive engines. The table shows maximum tonnage that can pass through the gate at any one time. Multiple systems installed in the same hull section may combine capacity.",
        cost: {5 => 1500000, 6 => 5000000}
    },

    {
        name: "Ore Processor",
        tech_level: 7,
        high_energy: 1,
        modifiers: {tons_mined_per_hour: {5 => 0.15, 6=> 0.5}},
        description: "A heavy-duty mining and processing system that can extract ore from rock, or convert ice or rock into a powdered residue suitable for use as mass driver reaction mass. It is rated for the tons/hour of ore it can extract or process.",
        cost: {5 => 30000, 6 => 100000}
    },

    {
        name: "Chemical Refinery",
        tech_level: 7,
        high_energy: 1,
        modifiers: {tons_refined_per_hour: {5 => 0.5, 6=> 1.5}},
        description: "Different types are possible, but the most common spacecraft type processes ice or water into hydrogen and oxygen for rocket fuel or reaction mass. It is rated for the tons of fuel refined per system per hour.",
        cost: {5 => 30000, 6 => 100000}
    },

    {
        name: "Open Space",
        modifiers: {spaces: {8 => 1, 9 => 2, 10 => 5, 11 => 10, 12 => 20, 13 => 50, 14 => 100, 15 => 200}},
        description: "This system is a pressurized hall or other large, open space. It contains one or more open areas such as an auditorium, farm, garden, pool, theater, or zoo with room for up to 100 people to congregate. Multiple open spaces may be combined to create larger areas. Twenty areas are equal to an acre of land (a football-field sized area). Open spaces used as gardens or farms may provide food requirements for the vessel’s occupants. One open space system is sufficient for the entire vessel; excess provide a surplus. The Open Space table shows the number of areas per system.",
        cost: {8 => 100000, 9 => 200000, 10 => 500000, 11 => 1000000, 12 => 2000000, 13 => 5000000, 14 => 10000000, 15 => 20000000},
        size_min: 8
    },

    {
        name: "Passenger Seating",
        modifiers: {sv: {5 => 2, 6 => 6}},
        description: "This is an alternative to a habitat for a short voyage or small spacecraft. The system contains a number of airliner-style passenger seats, separated by aisles. (Two seats may be replaced by one stabilized stretcher for casualty evacuation.) It includes 24 hours of limited life support per passenger seat or stretcher. The table shows number of seats.",
        cost: {5 => 10000, 6 => 30000}
    },

    {
        name: "Power Plant, Fuel Cell",
        tech_level: 7,
        power_points: 1,
        endurance: {tl: {7 => 3, 8 => 6, 9 => 12, 10 => 24}, unit: "hours"},
        fuel: "hydrox",
        suppliable: true,
        description: "This power plant is a high-efficiency chemical energy closed-cycle power plant using hydrogen and liquid oxygen fuel (much like a chemical rocket). Each system provides one Power Point.",
        cost: {5 => 15000, 6 => 50000}
    },

    {
        name: "Power Plant, MHD Turbine",
        tech_level: 9,
        power_points: 2,
        endurance: {tl: {9 => 6, 10 => 12}, unit: "hours"},
        fuel: "hydrox",
        suppliable: true,
        description: "An advanced high-performance closed-cycle turbine running on hydrogen and liquid oxygen fuel. Each system provides two Power Points.",
        cost: {5 => 30000, 6 => 100000}
    },

    {
        name: "Power Plant, Fission Reactor",
        tech_level: 8,
        power_points: 1,
        endurance: {tl: {8 => 25, 9 => 50, 10 => 75}, unit: "years"},
        description: "This is a high-performance nuclear fission reactor (or on very large vessels, a series of several reactors). Each system provides one Power Point.",
        cost: {5 => 100000, 6 => 300000}
    },

    {
        name: "Power Plant, Fusion Reactor",
        tech_level: 9,
        power_points: 2,
        endurance: {tl: {9 => 50, 10 => 200, 11 => 600, 12 => 1500}, unit: "years"},
        description: "Uses a thermonuclear fusion reaction; each system provides two Power Points. It has internal fuel for 50 years at TL9, 200 years at TL10, 600 years at TL11, or 1,500 years at TL12.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Power Plant, Antimatter",
        tech_level: 10,
        power_points: 4,
        volatile: true,
        endurance: {tl: {10 => 2, 11 => 20, 12 => 200}, unit: "years"},
        description: "Uses a matter-antimatter reaction. If damaged, it may explode (see Volatile Systems, p. 62). Each system provides four Power Points. Internal fuel gives two years endurance (at TL10), 20 years (TL11), or 200 years (TL12).",
        cost: {5 => 600000, 6 => 2000000}
    },

    {
        name: "Power Plant, Super Fusion",
        tech_level: 11,
        power_points: 4,
        endurance: {tl: {11 => 400, 12 => 1000}, unit: "years"},
        description: "An exotic fusion system (muon-catalyzed or black hole catalyzed, for example), or a design that uses force fields, gravity control, etc. to contain the reaction for better performance. Provides four Power Points for 400 years (TL11) or 1,000 years (TL12).",
        cost: {5 => 1000000, 6 => 3000000}
    },

    {
        name: "Power Plant, Total Conversion",
        superscience: true,
        tech_level: 12,
        power_points: 5,
        endurance: {unit: "unlimited"},
        description: "Converts matter directly into energy with 100% efficiency. Can also represent other forms of exotic power plant (caged baby universes, etc.). It provides five Power Points with effectively unlimited endurance.",
        cost: {5 => 2000000, 6 => 6000000}
    },

    {
        name: "Ramscoop",
        location: "front",
        tech_level: 10,
        modifiers: {ramscoop: true},
        description: "An electromagnetic scoop intended to capture interstellar hydrogen molecules for fuel and reaction mass. At 1,800 mps or more, one Ramscoop system provides unlimited reaction mass for one drive system: antimatter plasma rocket, antimatter plasma torch, super antimatter plasma torch, fusion rocket, fusion torch, super fusion torch, total conver- sion torch, or super conversion torch. Each ramscoop requires one Power Point to power up, but no power to maintain.",
        cost: {5 => 3000000, 6 => 10000000}
    },

    {
        name: "Reaction Engine, Chemical Rocket",
        location: "rear",
        tech_level: 7,
        modifiers: {thrust: {any: 3.0}},
        suppliable: true,
        fuel: "hydrox",
        delta_v: {any: 0.15},
        description: "This is a reaction drive that burns fuel and oxidizer, such as a mix of liquid hydrogen and liquid oxygen, to produce thrust. Each engine provides 3G acceleration. Each fuel tank of rocket fuel provides 0.15 mps delta-V.",
        cost: {5 => 60000, 6 => 200000}
    },

    {
        name: "Reaction Engine, HEDM Rocket",
        location: "rear",
        tech_level: 9,
        modifiers: {thrust: {any: 2.0}},
        volatile: true,
        suppliable: true,
        fuel: "HDEM",
        delta_v: {any: 0.5},
        description: "Uses high-energy density materials such as metallic hydrogen or metastable helium, for fuel. Each fuel tank of HEDM fuel provides 0.5 mps delta-V, but may explode if damaged. Each engine gives 2G acceleration.",
        cost: {5 => 90000, 6 => 300000}
    },

    {
        name: "Reaction Engine, Ion Drive",
        location: "rear",
        tech_level: 8,
        modifiers: {thrust: {any: 0.0005}},
        suppliable: true,
        fuel: "argon",
        delta_v: {any: 3.0},
        high_energy: 1,
        description: "A high-impulse, low-thrust engine that ionizes a reaction mass and accelerates it as a beam of ions to produce thrust. Each ion drive engine provides 0.0005G acceleration, but is a high-energy system that requires one Power Point. Each fuel tank of ionizable reaction mass provides 3 mps delta-V. These statistics also apply to most plasma thruster systems.",
        cost: {5 => 100000, 6 => 300000}
    },

    {
        name: "Reaction Engine, Mass Driver",
        location: "rear",
        tech_level: 9,
        modifiers: {thrust: {any: 0.01}},
        suppliable: true,
        fuel: "any",
        delta_v: {any: 0.3},
        high_energy: 1,
        description: "An electromagnetic accelerator that launches buckets of reaction mass at high velocity to produce thrust. Its performance is unimpressive, but it can use just about anything as reaction mass. Each fuel tank or cargo hold’s worth of mass (often powdered rock!) ejected provides 0.3 mps delta-V. Each mass driver engine provides 0.01G acceleration, but is a high-energy system that requires one Power Point.",
        cost: {5 => 100000, 6 => 300000}
    },

    {
        name: "Reaction Engine, Nuclear Thermal Rocket",
        location: "rear",
        tech_level: 7,
        modifiers: {thrust: {7 => 0.1, 8 => 0.2, 9 => 0.5}},
        suppliable: true,
        fuel: "hydrogen",
        delta_v: {7 => 0.3, 8=> 0.45},
        description: "This reaction engine heats a fluid as it passes through a built-in solid- or liquid-core nuclear reactor and expels it for thrust. Each NTR engine gives 0.1G acceleration (TL7), 0.2G (TL8), or 0.5G (at TL9+). Each fuel tank of hydrogen gives a delta-V of 0.3 mps (TL7-8) or 0.45 mps (TL8).",
        cost: {5 => 150000, 6 => 500000}
    },

    {
        name: "Reaction Engine, Nuclear Light Bulb",
        location: "rear",
        tech_level: 9,
        modifiers: {thrust: {9 => 0.01, 10 => 0.05}},
        suppliable: true,
        fuel: "hydrogen",
        delta_v: {any: 0.8},
        description: "An enclosed gas-core fission drive; radiation from the reactor (principally light) passes through a transparent containment vessel, to heat the fuel (hence “nuclear light bulb”). Each engine gives 0.01G acceleration (TL9) or 0.05G (TL10+). Each fuel tank of hydrogen gives a delta-V of 0.8 mps.",
        cost: {5 => 150000, 6 => 500000}
    },

    {
        name: "Reaction Engine, Nuclear Saltwater Rocket",
        location: "rear",
        tech_level: 9,
        superscience: true,
        volatile: true,
        modifiers: {thrust: {any: 2.0}},
        suppliable: true,
        fuel: "uranium saltwater",
        delta_v: {any: 2.5},
        description: "A high-performance “fission torch” rocket fuelled by water containing dissolved salts of enriched uranium in a barely sub-critical state. Released into the reaction chamber, it creates a continuous nuclear reaction directly behind the rocket, using the water as a reaction mass. Each engine gives 2G acceleration. Each fuel tank of uranium-saltwater fuel gives a delta-V of 2.5 mps. The engine and fuel may explode if damaged – see Volatile Systems (p. 62).",
        cost: {5 => 150000, 6 => 500000}
    },

    {
        name: "Reaction Engine, External Pulsed Plasma",
        location: "rear",
        tech_level: 7,
        modifiers: {thrust: {any: 2.0}},
        suppliable: true,
        fuel: "nuclear bombs",
        delta_v: {7 => 2.0, 8 => 3.0, 9 => 4, 10 => 8},
        description: "Pulse units are full-size nuclear bombs that are ejected out and exploded behind the vessel. The plasma wave impacts an acceleration pusher plate, producing thrust. The rear hull section must have dDR 50 or better, or dDR 5+ plus a magnetic sail (“Mag-Orion”). Each engine produces 2G acceleration. Each fuel tank of bomb pulse units gives a delta-V of 2 mps (TL7), 3 mps (TL8), 4 mps (TL9), 8 mps (TL10+).",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Reaction Engine, Fusion Pulse Drive",
        location: "rear",
        tech_level: 9,
        modifiers: {thrust: {9 => 0.02, 10 => 0.05}},
        suppliable: true,
        fuel: "nuclear pulse units",
        delta_v: {9 => 5, 10 => 10, 11 => 40},
        description: "Uses laser beams, particle beams and/or miniscule amounts of antimatter to trigger fusion micro-explosions in tiny nuclear fuel pellets in the reaction chamber. Each engine gives 0.02G acceleration (TL9) or 0.05G (TL10+). Each fuel tank of fuel pellets gives a delta-V of 5 mps (TL9), 10 mps (TL10), 40 mps (TL11+).",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Reaction Engine, Advanced Fusion Pulse Drive",
        location: "rear",
        tech_level: 9,
        modifiers: {thrust: {any: 0.005}},
        suppliable: true,
        fuel: "nuclear pulse units",
        delta_v: {9 => 20, 10 => 100, 11 => 350},
        description: "A fusion pulse drive optimized for outer system or interstellar travel. Each engine give 0.005G acceleration. Each fuel tank of fuel pellets gives a delta-V of 20 mps (TL9), 100 mps (TL10), or 350 mps (TL11+).",
        cost: {5 => 600000, 6 => 2000000}
    },

    {
        name: "Reaction Engine, Super Fusion Pulse Drive",
        location: "rear",
        superscience: true,
        tech_level: 11,
        modifiers: {thrust: {11 => 20.0, 12 => 100}},
        suppliable: true,
        fuel: "nuclear pulse units",
        delta_v: {any: 350},
        description: "Uses extensive superscience (e.g., force field pusher plates and inertial dampers). Each engine give 20G acceleration at TL11 or 100G at TL12. Each tank of fuel pellets gives a delta-V of 350 MPS (at all TLs).",
        cost: {5 => 1200000, 6 => 4000000}
    },

    {
        name: "Reaction Engine, Fusion Rocket",
        location: "rear",
        tech_level: 9,
        modifiers: {thrust: {any: 0.005}},
        suppliable: true,
        fuel: "hydrogen",
        delta_v: {9 => 12, 10 => 60, 11 => 180, 12 => 450},
        description: "Generates a fusion reaction to heat hydrogen into plasma and expel it, adding extra cold mass for extra thrust. Each engine gives 0.005G acceleration. Each fuel tank of hydrogen gives a delta-V of 12 mps (TL9), 60 mps (TL10), 180 mps (TL11), or 450 mps (TL12). Requires minimum SM+9 at TL9; but no limit at TL10+.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Reaction Engine, Fusion Torch",
        location: "rear",
        tech_level: 10,
        superscience: true,
        modifiers: {thrust: {any: 0.5}},
        suppliable: true,
        fuel: "hydrogen",
        delta_v: {10 => 15, 11 => 45, 12 => 150},
        description: "A limited superscience high-performance fusion rocket. Each engine gives 0.5G acceleration. Each fuel tank of hydrogen gives a delta-V of 15 mps (TL10), 45 mps (TL11), or 150 mps (TL12).",
        cost: {5 => 600000, 6 => 2000000}
    },

    {
        name: "Reaction Engine, Super Fusion Torch",
        location: "rear",
        tech_level: 11,
        superscience: true,
        modifiers: {thrust: {any: 50.0}},
        suppliable: true,
        fuel: "hydrogen",
        delta_v: {any: 450},
        description: "A fusion drive derivative of the cosmic super fusion reactor. Each engine gives 50G acceleration. Each fuel tank of hydrogen gives a delta-V of 450 mps.",
        cost: {5 => 1200000, 6 => 4000000}
    },

    {
        name: "Reaction Engine, Antimatter Thermal Rocket",
        location: "rear",
        tech_level: 9,
        modifiers: {thrust: {9 => 0.1, 10 => 0.2, 11 => 0.4}},
        suppliable: true,
        volatile: true,
        fuel: "antimatter-catalyzed hydrogen",
        delta_v: {any: 1.8},
        description: "Annihilation of a tiny amount of antimatter directly heats a reaction mass which is expelled for thrust. Each engine gives 0.1G acceleration (TL9), 0.2G (TL10), or 0.4G (TL11+). Each fuel tank of antimatter-catalyzed hydrogen gives a delta-V of 1.8 mps.",
        cost: {5 => 150000, 6 => 500000}
    },

    {
        name: "Reaction Engine, Antimatter Plasma Rocket",
        location: "rear",
        tech_level: 10,
        modifiers: {thrust: {any: 0.01}},
        suppliable: true,
        volatile: true,
        fuel: "antimatter-boosted hydrogen",
        delta_v: {10 => 120.0, 11 => 360.0},
        description: "Uses the annihilation of a modest amount of antimatter to heat reaction mass into hot plasma, which is contained in magnetic fields and expelled for thrust. Each engine gives 0.01G acceleration. Each fuel tank of antimatter-boosted hydrogen gives a delta-V of 120 mps (TL10), 360 mps (TL11+).",
        cost: {5 => 150000, 6 => 500000}
    },

    {
        name: "Reaction Engine, Antimatter Plasma Torch",
        location: "rear",
        tech_level: 10,
        modifiers: {thrust: {any: 1.0}},
        suppliable: true,
        volatile: true,
        superscience: true,
        fuel: "antimatter-boosted hydrogen",
        delta_v: {10 => 120.0, 11 => 360.0},
        description: "A high-performance limited superscience version of the antimatter plasma rocket. Each engine provides 1G acceleration. Each fuel tank of antimatter-boosted hydrogen gives a delta-V of 120 mps (TL10), 360 mps (TL11+).",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Reaction Engine, Antimatter Pion",
        location: "rear",
        tech_level: 11,
        modifiers: {thrust: {any: 0.005}},
        suppliable: true,
        volatile: true,
        fuel: "matter/antimatter",
        delta_v: {any: 3400.0},
        description: "Matter and antimatter are annihilated at a 1:1 ratio, and magnetic fields focus the resulting charged pions into a near-light speed exhaust. Each engine gives 0.005G acceleration. Each fuel tank of matter/antimatter fuel gives 3,400 mps of delta-V.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Reaction Engine, Antimatter Pion Torch",
        location: "rear",
        tech_level: 11,
        modifiers: {thrust: {any: 0.1}},
        suppliable: true,
        volatile: true,
        superscience: true,
        fuel: "matter/antimatter",
        delta_v: {any: 3400.0},
        description: "A superscience version. Each engine gives 0.1G acceleration. Each fuel tank of mat- ter/antimatter fuel gives 3,400 mps of delta-V.",
        cost: {5 => 600000, 6 => 2000000}
    },

    {
        name: "Reaction Engine, Total Conversion Torch",
        location: "rear",
        tech_level: 12,
        modifiers: {thrust: {any: 1.0}},
        suppliable: true,
        volatile: true,
        superscience: true,
        fuel: "any",
        delta_v: {any: 10000.0},
        description: "Similar to antimatter pion, but makes use of total conversion of matter, so it can use ordinary fuel and is more efficient. Each engine gives 1G acceleration. Each fuel tank of hydrogen (or anything else) gives a delta-V of 10,000 mps.",
        cost: {5 => 600000, 6 => 2000000}
    },

    {
        name: "Reaction Engine, Super Conversion Torch",
        location: "rear",
        tech_level: 12,
        modifiers: {thrust: {any: 50.0}},
        suppliable: true,
        volatile: true,
        superscience: true,
        fuel: "any",
        delta_v: {any: 10000.0},
        description: "An engine derived from the cosmic total conversion reactor. Each engine gives 50G acceleration. Each fuel tank of hydrogen (or anything else) gives a delta-V of 10,000 mps.",
        cost: {5 => 1500000, 6 => 5000000}
    },

    {
        name: "Reactionless Engine, Dean Drive",
        location: "rear or center",
        tech_level: 7,
        modifiers: {thrust: {any: 0.1}},
        superscience: true,
        high_energy: 1,
        description: "These maneuver drive engines allow the vessel to accelerate without using up reaction mass. Top speed is near-lightspeed (“near-c”) (optionally much less, or variable, e.g., 0.01c per engine), but each engine is also a high-energy system that requires one Power Point. For example, a Dean Drive using oscillating rotating masses. Each engine gives 0.1G acceleration. May also go in a Central hull.",
        cost: {5 => 15000, 6 => 50000}
    },

    {
        name: "Reactionless Engine, Standard",
        location: "rear",
        tech_level: 10,
        modifiers: {thrust: {10 => 0.5, 11 => 1.0}},
        superscience: true,
        high_energy: 1,
        description: "These maneuver drive engines allow the vessel to accelerate without using up reaction mass. Top speed is near-lightspeed (“near-c”) (optionally much less, or variable, e.g., 0.01c per engine), but each engine is also a high-energy system that requires one Power Point. Each engine gives 0.5G acceleration at TL10 or 1G at TL11-12.",
        cost: {5 => 30000, 6 => 100000}
    },

    {
        name: "Reactionless Engine, Hot",
        location: "rear",
        tech_level: 10,
        modifiers: {thrust: {10 => 1.0, 11 => 2.0}},
        superscience: true,
        high_energy: 1,
        description: "These maneuver drive engines allow the vessel to accelerate without using up reaction mass. Top speed is near-lightspeed (“near-c”) (optionally much less, or variable, e.g., 0.01c per engine), but each engine is also a high-energy system that requires one Power Point. Each engine gives 1G acceleration at TL10 or 2G at TL11-12. It has a waste-heat signature equivalent to a conventional drive’s exhaust.",
        cost: {5 => 100000, 6 => 300000}
    },

    {
        name: "Reactionless Engine, Super",
        location: "rear",
        tech_level: 11,
        modifiers: {thrust: {11 => 50.0, 12 => 100.0}},
        superscience: true,
        high_energy: 1,
        description: "These maneuver drive engines allow the vessel to accelerate without using up reaction mass. Top speed is near-lightspeed (“near-c”) (optionally much less, or variable, e.g., 0.01c per engine), but each engine is also a high-energy system that requires one Power Point. Reactionless drive with 50G acceleration at TL11 or 100G at TL12.",
        cost: {5 => 200000, 6 => 600000}
    },

    {
        name: "Reactionless Engine, Subwarp",
        location: "rear",
        modifiers: {thrust: {any: 500.0}},
        superscience: true,
        high_energy: 1,
        description: "Each engine gives 500G acceleration. Also use this for most warp drives that can “downshift” to operate as reactionless drives. It will almost always be a pseudo- velocity drive.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Robot Arm",
        tech_level: 8,
        location: "hull",
        modifiers: {arm: true},
        description: "This system is a hand- or gripper-equipped arm, proportionately sized to the spacecraft, that can grab and manipulate spacecraft or other objects using the vessel’s ST. A robot arm can also function as an external clamp.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Soft-Landing System",
        tech_level: 7,
        location: "hull",
        modifiers: {soft_landing: true},
        description: "A reentry shield, airbags, or parachutes designed to allow a vessel that lacks wings, thrust, or contragravity to safely land from low orbit. The system is deploys automatically and is destroyed after landing – it must be replaced each time it’s used.",
        cost: {5 => 50000, 6 => 100000}
    },

    {
        name: "Solar Panel Array",
        tech_level: 7,
        location: "hull",
        power_points: 1,
        description: "A solar power system. If exposed to sunlight it generates one Power Point. A solar panel array is an exposed system and is not protected by spacecraft armor!",
        cost: {5 => 150000, 6 => 500000}
    },

    {
        name: "Lightsail",
        tech_level: 9,
        location: "hull",
        modifiers: {thrust: {any: 0.0001}},
        description: "This solar sail generates thrust from starlight (or a battery of launching lasers). Typical thrust in our inner solar system (at 1 AU from a Sol-type star) is 0.0001G per lightsail system. Thrust is affected by distance from the star: divide it by the square of the average distance. For stars with different luminosity than our own sun, multiply by relative luminosity.",
        cost: {5 => 300000, 6 => 1000000},
        size_max: 12
    },

    {
        name: "Magsail",
        tech_level: 9,
        location: "hull",
        modifiers: {thrust: {any: 0.001}},
        description: "A huge superconducting loop mounted in front of the spacecraft that interacts with charged particles from a star’s solar wind to generate thrust. It won’t provide acceleration far from a star (in interstellar space) but can also be used for deceleration by starships traveling through interstellar space at velocities beyond their top speed. Typical thrust is 0.001G per magsail system. Top speed cannot exceed 375 mps. A magsail requires one Power Point to activate, but no power to maintain once powered.",
        cost: {5 => 300000, 6 => 1000000},
        size_max: 12
    },

    {
        name: "Stardrive",
        superscience: true,
        modifiers: {ftl: 1},
        high_energy: 1,
        description: "This is a faster-than-light drive, such as a hyperdrive, jump drive, or warp drive, as well as all necessary fuel supplies or energy banks required to operate it. The exact mechanism is up to the GM. Multiple stardrive engines normally improve performance. In general, the base speed of a stardrive is multiplied by the number of stardrive engines. For jump drives or other designs that instantly travel an unlimited distance, the time required to prepare a jump drive may be divided by number of engines. Since exact capabilities are up to the GM, stardrives get a simple “FTL rating,” e.g., FTL-2 for two drives. This is a typical stardrive with FTL-1.",
        cost: {5 => 300000, 6 => 1000000}
    },

    {
        name: "Super Stardrive",
        superscience: true,
        modifiers: {ftl: 2},
        high_energy: 2,
        description: "In some settings, more powerful stardrives are available that have the same mass. This engine can provide FTL-1 if given one Power Point or boost up to FTL-2 if given two Power Points (!!). At the GM’s option, a super stardrive can also represent a drive that provides some extra capability at a higher energy cost.",
        cost: {5 => 1500000, 6 => 5000000}
    },

    {
        name: "Stasis Web",
        superscience: true,
        modifiers: {stasis: true},
        high_energy: 1,
        description: "This system places the spacecraft inside a bubble of time that runs far slower than the rest of the universe. It can be set to last anywhere from six minutes to billions of years as observed by the rest of the universe, while only microseconds pass within the bubble. Anything in stasis is frozen, unable to do anything, but is outside the normal space-time continuum, and cannot be affected by anything within it. The vessel could fall through the heart of a star or survive until the end of the universe. Viewed from the outside, an object encased in a sta- sis web is a perfectly reflecting mirror, and no sensors of any type can penetrate it. In space combat, stasis webs are turned on during power allocation and last for the duration set by the operator; a spacecraft using a stasis web is effectively inde- structible but able to do nothing but perform an uncontrolled drift.",
        cost: {5 => 2000000, 6 => 5000000}
    },

    {
        name: "Weapons Battery, Major",
        modifiers: {weapons: 1},
        description: "This is a single mount for a powerful weapon. It also includes targeting systems for aiming the battery’s weapons once the vessel’s array has detected a target.",
        cost: {5 => 150000, 6 => 600000}
    },

    {
        name: "Weapons Battery, Medium",
        modifiers: {weapons: 3},
        description: "Uses the same rules as a major battery but the weapons are less powerful and there may be up to three fixed or turrets mount weapons in the battery. It is possible to mix weapon types in the battery.",
        cost: {5 => 150000, 6 => 600000}
    },

    {
        name: "Weapons Battery, Secondary",
        modifiers: {weapons: 10},
        description: "Uses the same rules as a major battery except the weapons are less powerful and there may be a mix of up to 10 fixed or turret mounted weapons in the battery.",
        cost: {5 => 150000, 6 => 600000}
    },

    {
        name: "Weapons Battery, Tertiary",
        modifiers: {weapons: 30},
        description: "Uses the same rules as a secondary battery except the weapons are less powerful and there may be any mix of up to 30 fixed or turret mounted weapons in the battery.",
        cost: {5 => 150000, 6 => 600000}
    }

]

System.create(systems)

features = [

    {
        name: "Artificial Gravity",
        superscience: true,
        modifiers: {gravity: true},
        description: "Spacecraft may have superscience artificial gravity generators that create a gravity field that can be varied from 0 to 3G. Artificial gravity may be set for each hull section, and, in habitats or work spaces, for each room (from within the room).",
        cost: {5 => 30000, 6 => 100000}
    },

    {
        name: "Gravitic Compensators",
        superscience: true,
        modifiers: {no_accel: true},
        description: "This field negates up to 99.5% of felt acceleration but does not produce artificial gravity.",
        cost: {5 => 30000, 6 => 100000}
    },
    
    {
        name: "High Automation",
        modifiers: {high_auto: true},
        description: "Many systems on large vessels have a “Workspace” entry that represents the facilities that maintain the system and their crew. To reduce technical crew, a spacecraft can have automa- tion. Total Automation is available for any system that requires workspaces. It eliminates that requirement. High Automation is available for vessels of SM+12 or larger; it reduces number of workspaces (and techs) by a factor of 10. This feature’s cost is the number of workspaces the vessel required before reduc- tion multiplied by $5M (total automation) or $1M (high automation). Example: If an SM+13 ship required 90 workspaces (and techs), total automation cost would be $450M.",
        cost: {multiplier: 1000000, statistic: "workspaces"}
    },

    {
        name: "Total Automation",
        modifiers: {total_auto: true},
        description: "Many systems on large vessels have a “Workspace” entry that represents the facilities that maintain the system and their crew. To reduce technical crew, a spacecraft can have automa- tion. Total Automation is available for any system that requires workspaces. It eliminates that requirement. High Automation is available for vessels of SM+12 or larger; it reduces number of workspaces (and techs) by a factor of 10. This feature’s cost is the number of workspaces the vessel required before reduc- tion multiplied by $5M (total automation) or $1M (high automation). Example: If an SM+13 ship required 90 workspaces (and techs), total automation cost would be $450M.",
        cost: {multiplier: 5000000, statistic: "workspaces"}
    },

    {
        name: "Emergency Ejection",
        description: "A Control Room on an SM+5-8 vessel that was not installed in a [core] location may incorporate ejection capability to facilitate rapid escape. Ejection takes only one second (a free action in space combat turns) as long as the control room was not destroyed. Treat an ejected control station as a lifepod (see Ultra-Tech p. 232) except it holds the crew of the control room (and a backup of the computer). Emergency Ejection adds an extra $500K to cost.",
        cost: {any: 5000000}
    },

    {
        name: "Ram-Rockets",
        description: "The nuclear thermal rocket, antimatter thermal rocket, fusion torch, super fusion torch, antimatter plasma torch, and super antimatter plasma torch drives may have an auxiliary air-breathing air-ram mode for atmosphere. They suck in air with a turbine, heat it using their onboard drive reactor, and expel it for thrust. Thus, they don’t require fuel while flying in an atmosphere (breathable or otherwise) provided it is “very thin” or greater density (see p. B429). Multiply cost by 5.",
        cost: {multiplier: 5, statistic: "engine cost"}
    },

    {
        name: "Ram-Rockets",
        description: "The nuclear thermal rocket, antimatter thermal rocket, fusion torch, super fusion torch, antimatter plasma torch, and super antimatter plasma torch drives may have an auxiliary air-breathing air-ram mode for atmosphere. They suck in air with a turbine, heat it using their onboard drive reactor, and expel it for thrust. Thus, they don’t require fuel while flying in an atmosphere (breathable or otherwise) provided it is “very thin” or greater density (see p. B429). Multiply cost by 5.",
        cost: {multiplier: 5, statistic: "engine cost"}
    },

    {
        name: "Spin Gravity",
        modifiers: {gravity: true},
        description: "Larger unstreamlined spacecraft may be designed so part or all of the ship can spin to simulate interior gravity via the Coriolis effect. The maximum gravity (G) possible is shown on the Spin Gravity Table; it can spin slower for lower G. Spin gravity does not provide simulated gravity to core systems. A spacecraft using spin gravity is a -2 on its Handling while spinning.",
        cost: {5 => 3000, 6 => 10000},
        size_min: 8
    },

    {
        name: "Stealth",
        modifiers: {stealth: {multiplier: 2, statistic: "tech level minus 6"}},
        description: "The spacecraft hull is harder to detect with sensors. Subtract (TL-6) times 2 from rolls to detect it.",
        cost: {5 => 180000, 6 => 350000, 7 => 700000, 8 => 1500000, 9 => 3500000, 10 => 7000000, 11 => 15000000, 12 => 35000000, 13 => 70000000, 14 => 150000000, 15 => 500000000}
    },

    {
        name: "Stealth",
        tech_level: 8,
        modifiers: {stealth: {multiplier: 2, statistic: "tech level minus 6"}},
        description: "The spacecraft hull is harder to detect with sensors. Subtract (TL-6) times 2 from rolls to detect it.",
        cost: {5 => 180000, 6 => 350000, 7 => 700000, 8 => 1500000, 9 => 3500000, 10 => 7000000, 11 => 15000000, 12 => 35000000, 13 => 70000000, 14 => 150000000, 15 => 350000000}
    },

    {
        name: "Dynamic Chameleon",
        tech_level: 10,
        modifiers: {stealth: -4},
        description: "The spacecraft has a digital chameleon surface that can blend the vessel into the back- ground or paint the surface with any desired markings or imagery. It gives -4 penalty to detect the vehicle with ordinary vision only.",
        cost: {5 => 200000, 6 => 500000, 7 => 1000000, 8 => 2000000, 9 => 5000000, 10 => 10000000, 11 => 20000000, 12 => 50000000, 13 => 100000000, 14 => 200000000, 15 => 500000000}
    },

    {
        name: "Winged",
        modifiers: {wings: true},
        description: "A streamlined spacecraft of up to SM+12 may be designat- ed as winged. It has a wing (and perhaps a tail) and structural strengthening, providing extra lift and better handling when flying in atmosphere.",
        cost: {5 => 150000, 6 => 500000}
    }

]

Feature.create(features)

switches = [

    {
        name: "Drive Field",
        superscience: true,
        description: "Some reactionless drive engines or star drives may generate defensive fields as a side effect of their drive. The GM may rule that any reactionless engine is also a low-powered force screen at no extra power cost. Most often they function as screens with the kinetic and sometimes “partial” design switches (usually either the front or central hull)."
    },

    {
        name: "Electro-Mechanical Computers",
        modifiers: {complexity: {tl: {7 => -1, 8 => -2, 9 => -3, 10 => -4}}},
        description: "Computers can be much slower than the baseline. This is typical of some “retrotech” settings, such as golden age space opera. Reduce computer network Complexity by -1 at TL7, -2 at TL8, -3 at TL9, -4 at TL10+."
    },

    {
        name: "Exposed Radiators",
        description: "If this switch is used, spacecraft have large radiator arrays. This is realistic, but often ignored even in hard science fiction! Exposed radiators are appropriate for any “hard sf” space- craft with any reactor, or which use any fission, nuclear pulse, fusion, antimatter, or total conversion engine except nuclear thermal rocket, external pulsed plasma, or high-thrust antimatter thermal rocket engine. A vessel with exposed radiators has a retractable “main radiator array” extending out like a set of wings or fins. It is not a system – its mass is included with the power plant or drive. But it is vulnerable to damage and special rules apply to using them (or retracting them in combat)."
    },

    {
        name: "FTL Comms",
        superscience: true,
        description: "FTL comms allow communication over interstellar distances. GMs can assume FTL signals are instant and comm suite ranges in AU are now measured in parsecs, or give the signal a finite (but faster-than-light) speed."
    },

    {
        name: "FTL Sensors",
        superscience: true,
        description: "FTL active sensors usually also have extended ranges, but in game terms mainly serve to justify safe navigation using warp drives. The GM may multiply active sensor ranges by 10, or vastly increase them (measured in AU, or even parsecs)."
    },

    {
        name: "Pseudo-Velocity",
        superscience: true,
        modifiers: {no_accel: true},
        description: "Reactionless drives and stardrives may produce motion without accumulating momentum or kinetic energy. The drive does not produce acceleration effects on the ship or anything inside it (it’s in zero G unless given artificial or spin gravity; crew and vessel don’t experience acceleration.). If turned off or disabled, a vessel loses all speed gained as a result of accelera- tion while under pseudo-velocity. In the event of a collision involving the vessel, do not count velocity reached while under pseudo-velocity drive."
    }

]

Switch.create(switches)

habitats = [

    {
        name: "Bunkroom",
        size: 4,
        modifiers: {asv: 4},
        description: "Cramped accommodations with bunk beds for up to four people. Often used for enlisted crew, troops, or colonists."
    },

    {
        name: "Cabin",
        size: 4,
        modifiers: {asv: 2},
        description: "Quarters for one person in comfort or shared by two occupants."
    },

    {
        name: "Brig",
        size: 4,
        modifiers: {asv: 4},
        description: "Spartan accommodations equivalent to bunk, but with fewer amenities. Includes a barred door, electronic lock, and surveillance camera."
    },

    {
        name: "Luxury Cabin",
        size: 8,
        modifiers: {asv: 2},
        description: "A suite with very comfortable quarters for one or two occupants."
    },

    {
        name: "Steerage Cargo",
        size: 4,
        modifiers: {cargo: 5},
        description: "Unused tonnage in a habitat is usually assigned to cargo; this is a good way to use up excess capacity. Steerage cargo is pressurized and climate-controlled, so it can be used for livestock or delicate goods."
    },

    {
        name: "Briefing Room",
        size: 4,
        description: "A conference room with a table and up to 10 chairs."
    },

    {
        name: "Establishment",
        size: 8,
        description: "A facility such as a bar, brothel, casi- no, gym, massage parlor, nursery, salon, classroom, or retail store. Each has standing or seating room for up to 20 patrons, usually manned by one to three staffers."
    },

    {
        name: "Hibernation Chamber",
        size: 1,
        modifiers: {sleep: 1},
        description: "A pod housing one person. The “sleeper” inside it is unconscious, but ages at 1/10th speed and does not require sustenance."
    },

    {
        name: "Lab",
        size: 8,
        description: "A scientific laboratory usable by up to two peo- ple simultaneously. Fulfills equipment requirements for a scientific skill, e.g., Chemistry, Biology, Physics, or Science!, with a +1 equipment bonus. Each lab costs an extra $1M.",
        cost: {any: 1000000}
    },

    {
        name: "Office",
        size: 4,
        description: "Contains a desk and display terminal for use by one or two administrators, analysts, etc. Useful for skills such as Administration, Computer Operation, Computer Programming, Intelligence Analysis, Market Analysis, or Strategy skill tasks. A habitat with 10 or more offices devot- ed to the same activity can be classed as an “ops center” with +1 bonus to these tasks, or a “large ops center” with +2 bonus if 100 or more."
    },

    {
        name: "Sickbay",
        size: 4,
        description: "Medical facilities, e.g., a stabilized diagnos- tic bed, trauma maintenance, and surgery, for diagnosis and treatment of one patient at a time (First Aid for 1-4 patients). Multiple sickbays extend this, e.g., a “20-bed sick- bay” is 100 tons. Fulfills equipment requirements for Diagnosis, First aid, Physician, and Surgery skill with a +2 bonus. Ten-bed or larger sickbays (“clinic”) increase this to +3; 100+ beds (“hospital”) give +TL/2. Any size sickbay can use automeds for extra $100K per bed, allowing AI comput- er software to treat patients."
    },

    {
        name: "Teleport Projector",
        size: 4,
        superscience: true,
        tech_level: 12,
        description: "A two-way matter trans- mitter capable of transmitting 1-2 persons or 0.2 tons cargo. Takes about 10 seconds to send or retrieve and requires an Electronics Operation (MT) skill roll to use properly (-1 per 1,000 miles range), failure meaning a near miss, critical failure disaster; add +4 if beaming between two cooperating systems. It can be controlled from the bay or a control station. See GURPS Ultra-Tech (p. UT233) for detailed rules. Costs an extra $20M. Half cost if it can only send or receive.",
        cost: {any: 20000000}
    }

]

Habitat.create(habitats)

weapons = [

    {
        name: "Heat",
        kind: "beam",
        superscience: true,
        tech_level: 7,
        description: "A generic beam of “pure energy” with no special effects at all, for emulating pulp SF beam weapons."
    },

    {
        name: "Laser",
        kind: "beam",
        tech_level: 9,
        description: "A beam laser operating in visible light or near- ultraviolet frequencies."
    },

    {
        name: "Particle",
        kind: "beam",
        tech_level: 10,
        description: "A neutral particle beam optimized for space combat. It has superior armor penetration, but range and accuracy are inferior to lasers."
    },

    {
        name: "Plasma",
        kind: "beam",
        tech_level: 10,
        superscience: true,
        description: "These accelerate bolts of ionized plasma with double the damage of other weapons but poor range and accuracy."
    },

    {
        name: "UV Laser",
        kind: "beam",
        tech_level: 10,
        description: "A free electron laser operating in far- ultraviolet frequencies with superior range to lasers."
    },

    {
        name: "Antiparticle",
        kind: "beam",
        tech_level: 11,
        description: "Accelerates a beam of antiparticles, causing surface explosions and radiation effects; similar to a particle beam, but with greater damage."
    },

    {
        name: "Ghost Particle",
        kind: "beam",
        tech_level: 11,
        superscience: true,
        description: "Fires high-energy mesons or other exotic particles that pass through armor before detonating inside the target. Range and accuracy are inferior to a laser. Use Artillery (Beams) to fire it."
    },

    {
        name: "Tractor",
        kind: "beam",
        tech_level: 11,
        superscience: true,
        description: "Uses a ranged force field or gravity effect to pull or manipulate objects over a distance, but inflicts no damage at all."
    },

    {
        name: "X-Ray Laser",
        kind: "beam",
        tech_level: 11,
        description: "A free-electron laser operating in the X-ray frequency, with superior range to lasers and excellent penetration."
    },

    {
        name: "Graviton",
        kind: "beam",
        tech_level: 11,
        superscience: true,
        description: "Reaches inside the target, crushing or shaking it. Range and damage are inferior to lasers, but ignores armor and has superior force field penetration."
    },

    {
        name: "Conversion",
        kind: "beam",
        tech_level: 12,
        superscience: true,
        description: "Converts matter into energy or anti- matter, not only disintegrating a portion of the target, but also causing an explosion."
    },

    {
        name: "Graser",
        kind: "beam",
        tech_level: 12,
        description: "A gamma-ray laser similar to an X-ray laser, but with greater penetration."
    },

    {
        name: "Disintegrator",
        kind: "beam",
        tech_level: 12,
        superscience: true,
        description: "Reduces target to component particles or erases its existence."
    },

    {
        name: "Conventional Gun",
        kind: "gun",
        tech_level: 7,
        high_energy: false,
        description: "A large caliber conventional gun similar to a modern tank or heavy naval gun, with a mechanical autoloader. It is not a high-energy system."
    },

    {
        name: "Electromagnetic Gun",
        kind: "gun",
        tech_level: 9,
        description: "A coil gun or railgun with much higher muzzle velocity."
    },

    {
        name: "Grav Gun",
        kind: "gun",
        tech_level: 11,
        superscience: true,
        description: "A superscience weapon with a very high muzzle velocity."
    },

    {
        name: "Missile Launchers",
        kind: "missile",
        tech_level: 7,
        high_energy: false,
        description: "These fire self-propelled guided missiles. They are not high-energy systems."
    },

    {
        name: "Warp Missile Launchers",
        kind: "missile",
        tech_level: 11,
        superscience: true,
        description: "These fire similar missiles, but accelerate them to relativistic pseudo-velocities using an internal warp field accelerator, allowing the missile to reach distant targets nearly instantly. They are high-energy systems."
    }

]

Weapon.create(weapons)




