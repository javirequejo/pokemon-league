function Pokemon(name, imageSrc, type, movements, playerPosition) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.playerPosition = playerPosition;
    this.ps = 100;
    this.type = type;
    this.movements = movements;
    this.isLeft = playerPosition === 1;

}   


// Initialize the Pokemon data

Pokemon.prototype.initialize = function() {
    this.setImage();
    this.setName();
    this.updateLife();
    this.setAttackButtons();
}

Pokemon.prototype.initializeMachine = function() {
    this.setImage();
    this.setName();
    this.updateLife();
}

Pokemon.prototype.setImage = function() {
    if(this.isLeft) {
        $('#pokemon-img-1').removeClass('attack-right');
        $('#pokemon-img-1').removeClass('receive-attack-left');
        $('#pokemon-img-1').attr('src', this.imageSrc);
        $('#pokemon-img-1').fadeIn(2000);
    } else {
        $('#pokemon-img-1').removeClass('attack-left');
        $('#pokemon-img-1').removeClass('receive-attack-right');
        $('#pokemon-img-2').attr('src', this.imageSrc);
        $('#pokemon-img-2').fadeIn(2000);
    }
}

Pokemon.prototype.setName = function() {
    if(this.isLeft) {
        $('#pokemon-name-1').text(this.name);
    } else {
        $('#pokemon-name-2').text(this.name);
    }
}

Pokemon.prototype.setPsPoints = function() {
    if(this.isLeft) {
        $('#pokemon-ps-1').text("Life: " + this.ps + "/100");
    } else {
        $('#pokemon-ps-2').text("Life: " + this.ps + "/100");
    }
}

Pokemon.prototype.setAttackButtons = function() {
        for (var i = 0; i < 4; i++) {
            $(PLAYER1_SELECTORS[i]).text(this.movements[i].name + "  " + this.movements[i].powerpoints + "/5");
            $(PLAYER1_SELECTORS[i]).removeClass('disabled');
        }
}

//END Initialize the Pokemon data



//Rendering logic

Pokemon.prototype.attackMovement = function(numberAttack) {
    if(this.isLeft) {
        if(!this.hasAnimation(numberAttack)) {
            $('#pokemon-img-1').addClass('attack-basic-right');
            $('#attack-1').addClass(this.movements[numberAttack].classAnimation + '-left');
            $('#attack-1').attr('src', this.movements[numberAttack].imageSrc);
            setTimeout(function() {
                $('#pokemon-img-1').removeClass('attack-basic-right');
                $('#attack-1').removeClass(this.movements[numberAttack].classAnimation + '-left');
                $('#attack-1').removeAttr('src');
            }.bind(this), 1000);  
        } else {
            $('#pokemon-img-1').addClass('attack-right');
            setTimeout(function() {
                $('#pokemon-img-1').removeClass('attack-right');
            }, 1000);
        }
    } else {
        if(!this.hasAnimation(numberAttack)) {
            $('#pokemon-img-2').addClass('attack-basic-left');
            $('#attack-2').addClass(this.movements[numberAttack].classAnimation + '-right');
            $('#attack-2').attr('src', this.movements[numberAttack].imageSrc);
            setTimeout(function() {
                $('#pokemon-img-2').removeClass('attack-basic-left');
                $('#attack-2').removeClass(this.movements[numberAttack].classAnimation + '-right');
                $('#attack-2').removeAttr('src');
            }.bind(this), 1000);
        } else {
            $('#pokemon-img-2').addClass('attack-left');
            setTimeout(function() {
                $('#pokemon-img-2').removeClass('attack-left');
            }, 1000);
        }
    }
}


Pokemon.prototype.receiveMovement = function(numberAttack) {
    if(this.isLeft) {
        $('#pokemon-img-1').addClass('receive-attack-left');
        setTimeout(function() {
            $('#pokemon-img-1').removeClass('receive-attack-left');
        }, 1000);
        
    } else {
        $('#pokemon-img-2').addClass('receive-attack-right');
        setTimeout(function() {
            $('#pokemon-img-2').removeClass('receive-attack-right');
        }, 1000);
    }
}

Pokemon.prototype.updateLife = function () {
    if(this.isLeft) {
        $('#pokemon-ps-1').text("Life: " + this.ps + "/100");
        $('#pokemon-health-1').attr("value", this.ps);
    } else {
        $('#pokemon-ps-2').text("Life: " + this.ps + "/100");
        $('#pokemon-health-2').attr("value", this.ps);
    }
}

Pokemon.prototype.updateAttackButton = function (numberAttack) {
    $(PLAYER1_SELECTORS[numberAttack]).text(this.movements[numberAttack].name + "  " + this.movements[numberAttack].powerpoints + "/5");
}



Pokemon.prototype.dissapearPokemon = function() {
    setTimeout(function() {
        if(this.isLeft) {
            $('#pokemon-img-1').fadeOut();
        } else {
            $('#pokemon-img-2').fadeOut();
        }
    }.bind(this), 500)
}

Pokemon.prototype.attackMessage = function(numberAttack, points, pointsType) {
    console.log(pointsType);
    switch (pointsType) {
        case 0.5: $('#status-message').text(this.name + ' attacks with ' + this.movements[numberAttack].name + " and causes " + points + " points of damage. This attack is not very effective..");
        break;
        case 1: $('#status-message').text(this.name + ' attacks with ' + this.movements[numberAttack].name + " and causes " + points + " points of damage.");
        break;
        case 2: $('#status-message').text(this.name + ' attacks with ' + this.movements[numberAttack].name + " and causes " + points + " points of damage. This attack is very effective!");
        break;
        default: $('#status-message').text("");
        break;
    } 
}

//END Rendering logic


//Game logic

Pokemon.prototype.attackPoints = function(numberAttack) {
    this.movements[numberAttack].powerpoints--;
    this.updateAttackButton(numberAttack);
    return Math.floor(Math.random() * 35) + 10;
}

Pokemon.prototype.receiveAttack = function (pointsAttack) {
    if (pointsAttack >= this.ps) {
        this.isDead();
    } else {
    this.ps -= pointsAttack;
    this.updateLife();
    }
}

Pokemon.prototype.isAlive = function() {
    return this.ps > 0;
}

Pokemon.prototype.isDead = function() {
    this.ps = 0;
    this.updateLife();
}

Pokemon.prototype.hasAnimation = function(numberAttack) {
    return this.movements[numberAttack].classAnimation === undefined;
}

Pokemon.prototype.checkPPAttack = function(numberAttack) {
    if(this.movements[numberAttack].powerpoints <= 0) {
        $(PLAYER1_SELECTORS[numberAttack]).addClass('disabled');
    }
}

Pokemon.prototype.valueTypePokemon = function(typeOfDefendedPokemon, numberAttack) {
    if (this.type === 'physic') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 0.5; break;
            case 'ice': return 1; break;
            case 'water': return 1; break;
            case 'fire': return 1; break;
            case 'flying': return 1; break;
            case 'dragon': return 1; break;
            case 'ghost': return 1; break;
            case 'electric': return 1; break;
            default: return 1; break;
        }
    }
    if (this.type === 'ice') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 1; break;
            case 'ice': return 0.5; break;
            case 'water': return 0.5; break;
            case 'fire': return 1; break;
            case 'flying': return 2; break;
            case 'dragon': return 2; break;
            case 'ghost': return 1; break;
            case 'electric': return 1; break;
            default: return 1; break;
        }
    }
    if (this.type === 'water') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 1; break;
            case 'ice': return 1; break;
            case 'water': return 0.5; break;
            case 'fire': return 2; break;
            case 'flying': return 1; break;
            case 'dragon': return 0.5; break;
            case 'ghost': return 1; break;
            case 'electric': return 1; break;
            default: return 1; break;
        }
    }
    if (this.type === 'fire') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 1; break;
            case 'ice': return 2; break;
            case 'water': return 0.5; break;
            case 'fire': return 0.5; break;
            case 'flying': return 1; break;
            case 'dragon': return 0.5; break;
            case 'ghost': return 1; break;
            case 'electric': return 1; break;
            default: return 1; break;
        }
    }
    if (this.type === 'flying') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 1; break;
            case 'ice': return 1; break;
            case 'water': return 1; break;
            case 'fire': return 1; break;
            case 'flying': return 1; break;
            case 'dragon': return 1; break;
            case 'ghost': return 1; break;
            case 'electric': return 0.5; break;
            default: return 1; break;
        }
    }
    if (this.type === 'dragon') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 1; break;
            case 'ice': return 1; break;
            case 'water': return 1; break;
            case 'fire': return 1; break;
            case 'flying': return 1; break;
            case 'dragon': return 2; break;
            case 'ghost': return 1; break;
            case 'electric': return 1; break;
            default: return 1; break;
        }
    }
    if (this.type === 'ghost') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 0.5; break;
            case 'ice': return 1; break;
            case 'water': return 1; break;
            case 'fire': return 1; break;
            case 'flying': return 1; break;
            case 'dragon': return 1; break;
            case 'ghost': return 2; break;
            case 'electric': return 1; break;
            default: return 1; break;
        }
    }
    if (this.type === 'electric') {
        switch (typeOfDefendedPokemon) {
            case 'physic': return 1; break;
            case 'ice': return 1; break;
            case 'water': return 2; break;
            case 'fire': return 1; break;
            case 'flying': return 2; break;
            case 'dragon': return 0.5; break;
            case 'ghost': return 1; break;
            case 'electric': return 0.5; break;
            default: return 1; break;
        }
    }
}

//END Game logic

