import json

htv_data = [
    {
        "brand": "Siser",
        "style": "Easyweed",
        "name_hex_combos": [
            ("White", "#E3DFDC"),
            ("Silver", "#959EA3"),
            ("Gray", "#73797B"),
            ("Charcoal", "#484C56"),
            ("Black", "#26282B"),
            ("Brown", "#3B302D"),
            ("Dark Maroon", "#4A3844"),
            ("Maroon", "#4B2536"),
            ("Burgundy", "#660F2C"),
            ("Red", "#921323"),
            ("Bright Red", "#A42526"),
            ("Hibiscus", "#B43F3E"),
            ("Cardinal", "#71222D"),
            ("Texas Orange", "#9B331D"),
            ("Orange", "#BE401A"),
            ("Orange Soda", "#C14C01"),
            ("Mustard", "#A6740D"),
            ("Sun", "#CE8601"),
            ("Yellow", "#E09F01"),
            ("Lemon", "#D9C301"),
            ("Gold", "#A58840"),
            ("Vegas Gold", "#AE9D70"),
            ("Cream", "#D9C48F"),
            ("Light Apricot", "#D6B389"),
            ("Cashew", "#B49575"),
            ("Tan", "#B49575"),
            ("Latte", "#B49575"),
            ("Hazelnut", "#9B715A"),
            ("Chocolate", "#624D40"),
            ("Mocha", "#513729"),
            ("Lime", "#82B019"),
            ("Green Apple", "#588B40"),
            ("Green", "#265541"),
            ("Cadette Green", "#556A4C"),
            ("Sage", "#9FB48D"),
            ("Green Olive", "#657050"),
            ("Dark Green", "#364543"),
            ("Retro Mint", "#60B8AC"),
            ("Turquoise", "#36505D"),
            ("Powder Blue", "#9CB2B8"),
            ("Sky Blue", "#2B649A"),
            ("Pale Blue", "#8BAEC6"),
            ("Periwinkle", "#9BA3C1"),
            ("Royal Blue", "#394979"),
            ("Navy Blue", "#3D4249"),
            ("Purple", "#3F3A4E"),
            ("Wicked Purple", "#5B4C6C"),
            ("Lilac", "#AB89A0"),
            ("Passion Pink", "#D32365"),
            ("Pink", "#B14560"),
            ("Bubblegum", "#C9758D"),
            ("Flamingo", "#D8868C"),
            ("Melon", "#CC695A"),
            ("Pale Peach", "#D6A782"),
            ("Light Pink", "#D8978B"),
            ("Fluorescent Pink", "#FE157C"),
            ("Fluorescent Raspberry", "#EE0369"),
            ("Fluorescent Coral", "#E81A2D"),
            ("Fluorescent Orange", "#FE5001"),
            ("Fluorescent Yellow", "#D4DE01"),
            ("Fluorescent Green", "#28BC0D"),
            ("Fluorescent Blue", "#05549D"),
        ],
    },
    {
        "brand": "Siser",
        "style": "Glitter",
        "name_hex_combos": [
            ("White", "#D3D6C4"),
            ("Red", "#BD2537"),
        ],
    },
]


# Initialize empty array and primary key counter
fixture_data = []
pk = 1

# Iterate over outer htv_data array
for item in htv_data:
    brand = item["brand"]
    style = item["style"]

    # Iterate over name/hex combinations for current brand and style
    for name, hex_code in item["name_hex_combos"]:
        fixture_record = {
            "model": "api.HTVColor",
            "pk": pk,
            "fields": {
                "brand": brand,
                "style": style,
                "name": name,
                "hex_code": hex_code,
            },
        }
        fixture_data.append(fixture_record)
        pk += 1


# Write fixture_data to the fixture file
fixture_file_path = "api/fixtures/htv_colors_fixture.json"
with open(fixture_file_path, "w") as fixture_file:
    json.dump(fixture_data, fixture_file, indent=2)
