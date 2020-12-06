/*****************************************************************************************
 *
 *   Description:
 *    This code is not mine, I just modified it slightly by turning it into a class
 *    for use in the card game
 *
 *   Author: http://slicker.me/javascript/fireworks.htm
 *
 *   Date:
 *
 *   Revised: 12.04.20
 *
 *   Revised: Changed to a Class
 *
 *****************************************************************************************/

"use strict";

export default class Fireworks {

    max_fireworks = 5;
    max_sparks = 50;
    canvas;
    context;
    fireworks = [];


    constructor() {

        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');
        console.log(`${window.innerWidth} ${window.innerHeight}`);
        this.canvas.width = (window.innerWidth*0.8);
        this.canvas.height = window.innerHeight;
        for (let i = 0; i < this.max_fireworks; i++) {
            let firework = {
                sparks: []
            };
            for (let n = 0; n < this.max_sparks; n++) {
                let spark = {
                    vx: Math.random() * 5 + .5,
                    vy: Math.random() * 5 + .5,
                    weight: Math.random() * .3 + .03,
                    red: Math.floor(Math.random() * 2),
                    green: Math.floor(Math.random() * 2),
                    blue: Math.floor(Math.random() * 2)
                };
                if (Math.random() > .5) spark.vx = -spark.vx;
                if (Math.random() > .5) spark.vy = -spark.vy;
                firework.sparks.push(spark);
            }
            this.fireworks.push(firework);
            this.resetFirework(firework);

        }
        window.requestAnimationFrame(() => {this.explode()});
    }

    resetFirework(firework) {
        firework.x = Math.floor(Math.random() * this.canvas.width);
        firework.y = this.canvas.height;
        firework.age = 0;
        firework.phase = 'fly';
    }

    explode() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fireworks.forEach((firework,index) => {
            if (firework.phase === 'explode') {
                firework.sparks.forEach((spark) => {
                    for (let i = 0; i < 10; i++) {
                        let trailAge = firework.age + i;
                        let x = firework.x + spark.vx * trailAge;
                        let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
                        let fade = i * 20 - firework.age * 2;
                        let r = Math.floor(spark.red * fade);
                        let g = Math.floor(spark.green * fade);
                        let b = Math.floor(spark.blue * fade);
                        this.context.beginPath();
                        this.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
                        this.context.rect(x, y, 4, 4);
                        this.context.fill();
                    }
                });
                firework.age++;
                if (firework.age > 100 && Math.random() < .05) {
                    this.resetFirework(firework);
                }
            } else {
                firework.y = firework.y - 10;
                for (let spark = 0; spark < 15; spark++) {
                    this.context.beginPath();
                    this.context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
                    this.context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
                    this.context.fill();
                }
                if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
            }
        });
        window.requestAnimationFrame(() => { this.explode() });
    }
}








