/* animation Basics */
SLib.animationBackend = {
	jobs : Array(),
	intervalTime : 35, /* 25 frames per second and more */
	interval : false,
	isRunning : false,
	intervalle : 0,
	init : function(interval) {
		if(intervall)
			this.intervallTime = interval;
	},
	addJob : function(job) {
		this.jobs.push(job);
		job.initialize();
		/* start the loop if it isn't runing */
		if(this.isRunning == false)
			this.startLoop();
		return job;
	},
	startLoop : function() {
		this.isRunning = true;
		this.intervalle++;
		this.interval = window.setInterval("SLib.animationBackend.loop();", this.intervalTime);
	},
	loop : function() {
		/* loop through jobs */
		if(this.jobs.length != 0) {
			for(i = 0; i < this.jobs.length; i++) {
				var job = this.jobs[i];
				if(job.done == false) {
					job.time = job.time + this.intervalTime;
					job.think(job.time/job.totalTime);
				}
				/* clean up if done */
				if(job.done == true) {
					/* kill the job */
					job.finalize();
					this.jobs.splice(i, 1);
					i--;
				}
			}
		} else
			/* end if no jobs left */
			this.stopLoop();
	},
	stopLoop : function() {
		this.isRunning = false;
		window.clearInterval(this.interval);
	},
	basicJob : function() {
		this.done = false;
		this.time = 0;
		this.totalTime = 250; /* default duration */
		this.initialize = function() {};
		this.think = function(percent) {
		    if(percent >= 1.0)
		        this.done = true;
		};
		this.finalize = function() {};
	    this.start = function() {
		    SLib.animationBackend.addJob(this);
		    return this;
	    }
	    this.quickEnd = function() {
		    this.finalize();
		    this.finalize = function() {}; /* it's getting called again next frame */
		    this.done = true;
		    return this;
	    }
	},
	colorFade : function(start, end, percentage) {
		result = new SLib.color();

		result.red = parseInt((end.red - start.red)*percentage+start.red);
		result.green = parseInt((end.green - start.green)*percentage+start.green);
		result.blue = parseInt((end.blue - start.blue)*percentage+start.blue);

		return result.getHex();
	}
}
