// TODO

/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.Entity.extend({
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);
    
        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(2, 2);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function(dt) {

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            // this.flipX(true);
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            // this.flipX(false);
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            // unflip the sprite
            // this.flipX(false);
            // this.flipY(true);
            // update the entity velocity
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            // this.flipX(false);
            // update the entity velocity
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else {
         this.body.vel.x = 0;
         this.body.vel.y = 0;
        }

        // if (me.input.isKeyPressed('jump')) {
        //     // make sure we are not already jumping or falling
        //     if (!this.body.jumping && !this.body.falling) {
        //         // set current vel to the maximum defined value
        //         // gravity will then do the rest
        //         this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        //         // set the jumping flag
        //         this.body.jumping = true;
        //     }
 
        // }
        
        //transform entity by switching sprite if transform button is pressed

 
        // check & update player movement
        this.body.update(dt);
 
        // update animation if necessary
        if (this.body.vel.x!=0 || this.body.vel.y!=0) {
            // update object animation
            this._super(me.Entity, 'update', [dt]);
            return true;
        }
     
        // else inform the engine we did not perform
        // any update (e.g. position, animation)

        return false;
    },

    /**
     * colision handler
     */
    collideHandler : function (response) {
        if (response.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            if ((response.overlapV.y>0) && !this.body.jumping) {
                // bounce (force jump)
                this.body.falling = false;
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }
            else {
                // let's flicker in case we touched an enemy
                this.renderable.flicker(750);
            }
        }
    }
});
