const { name } = require("ejs");

let json = [
{"attack_type":"Physical","weapon_type":"Sword","name":"대검","name_eng":"GreatSword","code":"101"},
{"attack_type":"Physical","weapon_type":"Sword","name":"한손검","name_eng":"OneHandedSword","code":"102"},
{"attack_type":"Physical","weapon_type":"Sword","name":"두손검","name_eng":"TwoHandedSword","code":"103"},
{"attack_type":"Physical","weapon_type":"Glove","name":"너클","name_eng":"Knuckles","code":"201"},
{"attack_type":"Physical","weapon_type":"Glove","name":"권갑","name_eng":"Gauntlet","code":"202"},
{"attack_type":"Physical","weapon_type":"HiddenWeapon","name":"단검","name_eng":"Dagger","code":"301"},
{"attack_type":"Physical","weapon_type":"HiddenWeapon","name":"아대","name_eng":"ArmBand","code":"302"},
{"attack_type":"Physical","weapon_type":"RangedWeapon","name":"활","name_eng":"Bow","code":"401"},
{"attack_type":"Physical","weapon_type":"RangedWeapon","name":"총","name_eng":"Gun","code":"402"},
{"attack_type":"Magical","weapon_type":"Magician","name":"스태프","name_eng":"Staff","code":"501"},
{"attack_type":"Magical","weapon_type":"Magician","name":"완드","name_eng":"Wand","code":"502"},
{"attack_type":"Magical","weapon_type":"Magician","name":"오브","name_eng":"Orb","code":"503"},
{"attack_type":"Magical","weapon_type":"DarkMagician","name":"염주","name_eng":"Rosario","code":"601"},
{"attack_type":"Magical","weapon_type":"DarkMagician","name":"강령술서","name_eng":"NecromanticScroll","code":"602"},
{"attack_type":"Magical","weapon_type":"Clergy","name":"성경","name_eng":"Bable","code":"701"},
{"attack_type":"Magical","weapon_type":"Clergy","name":"십자가","name_eng":"Cross","code":"702"}
]

let result = {

}

for(let element in json){
    let attack_type = json[element].attack_type;
    let weapon_type = json[element].weapon_type;
    let name_eng = json[element].name_eng;
    let name = json[element].name;
    let code = json[element].code;

    if(!result[attack_type]){
        result[attack_type] = {};
    }

    if(!result[attack_type][weapon_type]){
        result[attack_type][weapon_type] = {};
    }
    

    result[attack_type][weapon_type][name_eng] = {
        "name": name,
        "nameEng": name_eng,
        "code": Number(code)
    };
}
console.log(JSON.stringify(result, null, 4))