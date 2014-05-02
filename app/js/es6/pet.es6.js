/* exported Pet */
/* global _, pets */

class Pet {
  constructor(gender,species,speciesImg,name='Pet',age=0) {
    this.name = name;
    this.gender = gender;
    this.age = age * 1;
    this.species = species;
    this.speciesImg = `../media/${speciesImg}`;

    this.health = _.random(10,100);
    this.full = _.random(5,50);
    this.mood = _.random(1,10);
  }

// Class methods
  static find(name) {
    return _(pets).find(p=>p.name===name);
  }

// Instance methods
  eat() {
    this.full += _.random(1,3);
    this.health += _.random(1,2);

    if(this.full > 50)   { this.full = 50; }
    if(this.health > 99) { this.health = 99; }
  }

  sleep() {
    this.health += _.random(1,5);
    this.mood--;
    if(this.health > 99) { this.health = 99; }
    if(this.mood < 1)    { this.mood = 0; }
  }

  play() {
    this.mood += _.random(0,1);
    this.full -= _.random(1,3);
    this.health -= _.random(1,3);

    if(this.mood > 10)  { this.mood = 10; }

    // Check if dead
    if(this.full < 1 || this.health < 1) {
      this.full = 0;
      this.health = 0;
//      let tmpName = this.name;
      // $('div[data-name='+this.name+']').slideUp(1200, killit(x) { $('div[data-name='+x.name+'] > .pet-img > img').attr('src', '../media/dead.png'); });
      $('div[data-name='+this.name+']').slideUp(10);
      $('div[data-name='+this.name+'] > .pet-img > img').attr('src', '../media/dead.png');
      $('div[data-name='+this.name+']').slideDown(1200);
    }
  }


  update() {
    // update health
    $('div[data-name='+this.name+']').find('div.health-bar > div.stat-name').text(`Health: ${this.health}`);
    $('div[data-name='+this.name+']').find('div.health-bar > div.low').css('width', 0.40*this.health+'%');
    $('div[data-name='+this.name+']').find('div.health-bar > div.high').css('width', 0.40*(100-this.health)+'%');

    // update full
    $('div[data-name='+this.name+']').find('div.full-bar > div.stat-name').text(`Full: ${this.full}`);
    $('div[data-name='+this.name+']').find('div.full-bar > div.low').css('width', 0.80*this.full+'%');
    $('div[data-name='+this.name+']').find('div.full-bar > div.high').css('width', 0.80*(50-this.full)+'%');

    // update mood
    $('div[data-name='+this.name+']').find('div.mood-bar > div.stat-name').text(`Mood: ${this.mood}`);
    $('div[data-name='+this.name+']').find('div.mood-bar > div.low').css('width', 4*this.mood+'%');
    $('div[data-name='+this.name+']').find('div.mood-bar > div.high').css('width', 4*(10-this.mood)+'%');
  }

  render() {
    let div = $(`<div data-name=${this.name} class='pet'>
                  <div class='pet-img'>
                    <img src='${this.speciesImg}'>
                  </div>
                  <table class='pet-table'>
                    <tbody>
                      <tr>
                        <td class='label'>Name: </td>
                        <td>${this.name}</td>
                        <td class='pet-action eat'>Eat</td>
                      <tr>
                        <td class='label'>Gender: </td>
                        <td>${this.gender}</td>
                        <td class='pet-action sleep'>Sleep</td>
                      <tr>
                        <td class='label'>Age: </td>
                        <td>${this.age}</td>
                        <td class='pet-action play'>Play</td>
                    </tbody>
                  </table>
                  <div class='stat-bar health-bar'>
                    <div class='stat-name' style='width: 40%;'>Health: ${this.health}</div>
                    <div class='low' style='width: ${.40*this.health}%;'></div>
                    <div class='high' style='width: ${.40*(100-this.health)}%;'></div>
                  </div>
                  <div class='stat-bar full-bar'>
                    <div class='stat-name' style='width: 40%;'>Full: ${this.full}</div>
                    <div class='low' style='width: ${.80*this.full}%;'></div>
                    <div class='high' style='width: ${.80*(50-this.full)}%;'></div>
                  </div>
                  <div class='stat-bar mood-bar'>
                    <div class='stat-name' style='width: 40%;'>Mood: ${this.mood}</div>
                    <div class='low' style='width: ${4*this.mood}%;'></div>
                    <div class='high' style='width: ${4*(10-this.mood)}%;'></div>
                  </div>
                </div>`);
    $('#pets').append(div);
  }
}
