/* global Pet, pets*/

(function(){
  'use strict';

  $(document).ready(init);

  function init() {
    $('#add').click(addPet);
    $('#pets').on('click', '.eat', eat);
    $('#pets').on('click', '.sleep', sleep);
    $('#pets').on('click', '.play', play);
  }

  function addPet() {
    let speciesImg = $('#species').val();
    let species = $('#species option:selected').text();
    let age = $('#age').val() || undefined;
    let name = $('#name').val() || undefined;
    let gender = $('#gender').val();

    let pet = new Pet(gender, species, speciesImg, name, age);
    pets.push(pet);

    pet.render();
    Pet.find('Fred');
  }

  function eat() {
    let name = $(this).closest('.pet').data('name');
    let p = Pet.find(name);
    p.eat();
    p.update();
    // console.log(_.findIndex(pets, {'name':name}) );
  }

  function sleep() {
    let name = $(this).closest('.pet').data('name');
    let p = Pet.find(name);
    p.sleep();
    p.update();
  }

  function play() {
    let name = $(this).closest('.pet').data('name');
    let p = Pet.find(name);
    p.play();
    p.update();
  }

})();
