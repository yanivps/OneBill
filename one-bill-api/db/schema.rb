# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180221134238) do

  create_table "accounts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "account_number", null: false
    t.string "owner_name"
    t.string "owner_phone"
    t.bigint "physical_address_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_number"], name: "index_accounts_on_account_number", unique: true
    t.index ["physical_address_id"], name: "index_accounts_on_physical_address_id"
  end

  create_table "bills", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "municipality_account_id", null: false
    t.string "bill_account_number", null: false
    t.integer "amount_cents", default: 0, null: false
    t.string "amount_currency", default: "ILS", null: false
    t.date "service_date"
    t.integer "days_of_service"
    t.date "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["municipality_account_id", "bill_account_number"], name: "index_bills_on_municipality_account_id_and_bill_account_number", unique: true
    t.index ["municipality_account_id"], name: "index_bills_on_municipality_account_id"
  end

  create_table "categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "cities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "code"
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_cities_on_code", unique: true
    t.index ["name"], name: "index_cities_on_name", unique: true
  end

  create_table "credit_card_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_credit_card_types_on_name", unique: true
  end

  create_table "credit_cards", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "credit_card_type_id", null: false
    t.string "last_4", limit: 4, null: false
    t.string "token"
    t.date "expires_at", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["credit_card_type_id"], name: "index_credit_cards_on_credit_card_type_id"
    t.index ["user_id"], name: "index_credit_cards_on_user_id"
  end

  create_table "invitations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "account_id", null: false
    t.string "phone_number", null: false
    t.string "token", null: false
    t.datetime "expires_at", null: false
    t.datetime "used_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_invitations_on_account_id"
    t.index ["token"], name: "index_invitations_on_token", unique: true
  end

  create_table "municipality_accounts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "municipality_account_number", null: false
    t.bigint "account_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id", "municipality_account_number"], name: "index_municipality_accounts_on_account_id_and_account_number", unique: true
    t.index ["account_id"], name: "index_municipality_accounts_on_account_id"
    t.index ["category_id"], name: "index_municipality_accounts_on_category_id"
  end

  create_table "payment_applications", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "amount_cents", default: 0, null: false
    t.string "amount_currency", default: "ILS", null: false
    t.bigint "payment_id", null: false
    t.bigint "bill_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bill_id"], name: "index_payment_applications_on_bill_id"
    t.index ["payment_id"], name: "index_payment_applications_on_payment_id"
  end

  create_table "payment_processors", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_payment_processors_on_name", unique: true
  end

  create_table "payment_sources", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_payment_sources_on_name", unique: true
  end

  create_table "payments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "amount_cents", default: 0, null: false
    t.string "amount_currency", default: "ILS", null: false
    t.bigint "account_id", null: false
    t.bigint "user_id"
    t.string "payment_method_type"
    t.bigint "payment_method_id"
    t.bigint "payment_source_id", null: false
    t.integer "processing_status"
    t.bigint "payment_processor_id"
    t.string "processor_request_uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_payments_on_account_id"
    t.index ["payment_method_type", "payment_method_id"], name: "index_payments_on_payment_method_type_and_payment_method_id"
    t.index ["payment_processor_id"], name: "index_payments_on_payment_processor_id"
    t.index ["payment_source_id"], name: "index_payments_on_payment_source_id"
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "physical_addresses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "city_id", null: false
    t.bigint "street_id", null: false
    t.integer "house_number", null: false
    t.string "entrance"
    t.integer "apartment_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_physical_addresses_on_city_id"
    t.index ["street_id"], name: "index_physical_addresses_on_street_id"
  end

  create_table "streets", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "code"
    t.string "name", null: false
    t.integer "official_code"
    t.bigint "city_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id", "code"], name: "index_streets_on_city_id_and_code", unique: true
    t.index ["city_id"], name: "index_streets_on_city_id"
    t.index ["code"], name: "index_streets_on_code"
  end

  create_table "user_of_accounts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "account_id"
    t.boolean "is_removed", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id", "user_id"], name: "index_user_of_accounts_on_account_id_and_user_id", unique: true
    t.index ["account_id"], name: "index_user_of_accounts_on_account_id"
    t.index ["user_id"], name: "index_user_of_accounts_on_user_id"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "provider", default: "email", null: false
    t.string "uid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone_number", null: false
    t.boolean "is_verified"
    t.string "verification_code"
    t.index ["email", "provider"], name: "index_users_on_email_and_provider", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "accounts", "physical_addresses"
  add_foreign_key "bills", "municipality_accounts"
  add_foreign_key "credit_cards", "credit_card_types"
  add_foreign_key "credit_cards", "users"
  add_foreign_key "invitations", "accounts"
  add_foreign_key "municipality_accounts", "accounts"
  add_foreign_key "municipality_accounts", "categories"
  add_foreign_key "payment_applications", "bills"
  add_foreign_key "payment_applications", "payments"
  add_foreign_key "payments", "accounts"
  add_foreign_key "payments", "payment_processors"
  add_foreign_key "payments", "payment_sources"
  add_foreign_key "payments", "users"
  add_foreign_key "physical_addresses", "cities"
  add_foreign_key "physical_addresses", "streets"
  add_foreign_key "streets", "cities"
  add_foreign_key "user_of_accounts", "accounts"
  add_foreign_key "user_of_accounts", "users"
end
