# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_29_083411) do

  create_table "features", force: :cascade do |t|
    t.string "name"
    t.integer "tech_level"
    t.text "modifiers"
    t.text "description"
    t.boolean "superscience", default: false
    t.text "cost"
    t.integer "size_min", default: 5
    t.integer "size_max", default: 15
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "habitat_spaces", force: :cascade do |t|
    t.integer "habitat_id"
    t.integer "placement_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["habitat_id"], name: "index_habitat_spaces_on_habitat_id"
    t.index ["placement_id"], name: "index_habitat_spaces_on_placement_id"
  end

  create_table "habitats", force: :cascade do |t|
    t.string "name"
    t.integer "size"
    t.integer "tech_level"
    t.boolean "superscience", default: false
    t.text "modifiers"
    t.text "description"
    t.text "cost"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hulls", force: :cascade do |t|
    t.string "section"
    t.integer "spaceship_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["spaceship_id"], name: "index_hulls_on_spaceship_id"
  end

  create_table "placements", force: :cascade do |t|
    t.integer "location"
    t.integer "hull_id"
    t.integer "system_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "fuel"
    t.index ["hull_id"], name: "index_placements_on_hull_id"
    t.index ["system_id"], name: "index_placements_on_system_id"
  end

  create_table "spaceship_features", force: :cascade do |t|
    t.integer "spaceship_id"
    t.integer "feature_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["feature_id"], name: "index_spaceship_features_on_feature_id"
    t.index ["spaceship_id"], name: "index_spaceship_features_on_spaceship_id"
  end

  create_table "spaceship_switches", force: :cascade do |t|
    t.integer "spaceship_id"
    t.integer "switch_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["spaceship_id"], name: "index_spaceship_switches_on_spaceship_id"
    t.index ["switch_id"], name: "index_spaceship_switches_on_switch_id"
  end

  create_table "spaceships", force: :cascade do |t|
    t.string "name"
    t.integer "tech_level"
    t.integer "size"
    t.boolean "streamlined"
    t.boolean "superscience"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_spaceships_on_user_id"
  end

  create_table "switches", force: :cascade do |t|
    t.string "name"
    t.boolean "superscience", default: false
    t.text "modifiers"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "systems", force: :cascade do |t|
    t.string "name"
    t.integer "tech_level"
    t.string "hull_placement", default: "any"
    t.text "description"
    t.text "modifiers"
    t.integer "size_min", default: 5
    t.integer "size_max", default: 15
    t.text "cost"
    t.boolean "superscience", default: false
    t.integer "high_energy", default: 0
    t.integer "power_points", default: 0
    t.string "fuel"
    t.text "endurance"
    t.boolean "suppliable", default: false
    t.boolean "volatile", default: false
    t.text "delta_v"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "weapon_mounts", force: :cascade do |t|
    t.integer "weapon_id"
    t.integer "placement_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "kind"
    t.index ["placement_id"], name: "index_weapon_mounts_on_placement_id"
    t.index ["weapon_id"], name: "index_weapon_mounts_on_weapon_id"
  end

  create_table "weapons", force: :cascade do |t|
    t.string "name"
    t.string "kind"
    t.boolean "superscience", default: false
    t.integer "tech_level"
    t.text "description"
    t.boolean "high_energy", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
