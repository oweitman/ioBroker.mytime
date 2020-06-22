
(function($) {

	/**
	 * Daily Counter Clock Face
	 *
	 * This class will generate a daily counter for FlipClock.js. A
	 * daily counter will track days, hours, minutes, and seconds. If
	 * the number of available digits is exceeded in the count, a new
	 * digit will be created.
	 *
	 * @param  object  The parent FlipClock.Factory object
	 * @param  object  An object of properties to override the default
	 */

	mtFlipClock.MytimeFace = mtFlipClock.Face.extend({

		showSeconds: true,
        
		showsec: false,
		showmin: false,
		showhrs: false,
		showday: false,
        patter:"",

		/**
		 * Constructor
		 *
		 * @param  object  The parent FlipClock.Factory object
		 * @param  object  An object of properties to override the default
		 */

		constructor: function(factory, options) {
			this.base(factory, options);
            
            this.showday = (this.pattern[0]=='1') ? true:false;
            this.showhrs = (this.pattern[1]=='1') ? true:false;
            this.showmin = (this.pattern[2]=='1') ? true:false;
            this.showsec = (this.pattern[3]=='1') ? true:false;



            },

		/**
		 * Build the clock face
		 */

		build: function(time) {
			var t = this;
			var children = this.factory.$el.find('ul');
			var offset = 0;

			time = time ? time : this.factory.time.getDayCounter(true);

            if (this.showday) {
                t.createList(time[0]);
                t.createList(time[1]);
            }
            if (this.showhrs) {
                t.createList(time[2]);
                t.createList(time[3]);
            }
            if (this.showmin) {
                t.createList(time[4]);
                t.createList(time[5]);
            }
            if (this.showsec) {
                t.createList(time[6]);
                t.createList(time[7]);
            }

            offset = 0;
            if (this.showday && this.showhrs) {
                $(this.createDivider('')).insertBefore(this.lists[2].$el);
                offset += 2;
            }
            if (this.showhrs && this.showmin) {
                $(this.createDivider('')).insertBefore(this.lists[offset+2].$el);
                offset += 2;
            }
            if (this.showmin && this.showsec) {
                $(this.createDivider('')).insertBefore(this.lists[offset+2].$el);
            }
            

			this.base();
		},

		/**
		 * Flip the clock face
		 */

		flip: function(time, doNotAddPlayClass) {
			if(!time) {
				time = this.factory.time.getDayCounter(this.showSeconds);
			}
            
            var newtime = [];

            if (this.showday) {
                newtime.push(time[0]);
                newtime.push(time[1]);
            }
            if (this.showhrs) {
                newtime.push(time[2]);
                newtime.push(time[3]);
            }
            if (this.showmin) {
                newtime.push(time[4]);
                newtime.push(time[5]);
            }
            if (this.showsec) {
                newtime.push(time[6]);
                newtime.push(time[7]);
            }
            
			this.autoIncrement();

			this.base(newtime, false);
		}

	});

}(jQuery));
