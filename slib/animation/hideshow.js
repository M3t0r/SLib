SLib.hideByHeight = function(element, time, finalize, to, calculation) {
	/* defaults */
	if(!time)
		time = 250;
	if(!finalize)
		finalize = function() {};
	if(!to)
		to = 0;
	if(!calculation)
		calculation = function(percentage) {
			return percentage;
		};


	job = new SLib.animationBackend.basicJob();

	job.totalTime = time;
	job.element = element;
	job.calculation = calculation;
	job.from = parseInt(window.getComputedStyle(element, null).height);
	job.overflowBackup = window.getComputedStyle(element, null).overflow;
	job.to = to;
	job.padTop = parseInt(window.getComputedStyle(element, null).paddingTop);
	job.padBot = parseInt(window.getComputedStyle(element, null).paddingBottom);

	job.element.style.overflow = "hidden";

	job.finalizeCustom = finalize;
	job.finalize = function() {
		style = this.element.style;
		if(this.to == 0) {
			style.display = "none";
			style.height = this.from;
			style.overflow = this.overflowBackup;
			style.paddingTop = this.padTop;
			style.paddingBottom = this.padBot;
		} else {
			style.height = this.to;
		}
		this.finalizeCustom();
	}
	job.think = function() {
		this.percentage = this.time/this.totalTime;
		if(this.percentage >= 1.0) {
			this.done = true;
			this.percentage = 1.0;
		}
		this.element.style.height = (this.calculation(this.percentage)*-1+1)*(this.from-this.to)+this.to;
		this.element.style.paddingTop = (this.calculation(this.percentage)*-1+1)*this.padTop;
		this.element.style.paddingBottom = (this.calculation(this.percentage)*-1+1)*this.padBot;
	}
	job.quickEnd = function() {
		this.finalize();
		this.finalize = function() {};
		this.done = true;
	}
	job.start = function() {
		SLib.animationBackend.addJob(this);
	}
	return job;
};
SLib.showByHeight = function(element, time, finalize, to, calculation) {
	/* defaults */
	if(!time)
		time = 250;
	if(!to)
		to = parseInt(window.getComputedStyle(element, null).height);
	if(!finalize)
		finalize = function() {};
	if(!calculation)
		calculation = function(percentage) {
			return percentage;
		};


	job = new SLib.animationBackend.basicJob();

	job.totalTime = time;
	job.element = element;
	job.overflowBackup = window.getComputedStyle(element, null).overflow;
	job.calculation = calculation;
	job.from = 0;
	job.to = to;

	job.element.style.height = 0;
	job.element.style.display = "block";
	job.element.style.overflow = "hidden";

	job.finalizeCustom = finalize;
	job.finalize = function () {
		style = this.element.style;
		style.overflow = this.overflowBackup;
		this.finalizeCustom();
	}
	job.think = function() {
		this.percentage = this.time/this.totalTime;
		if(this.percentage >= 1.0) {
			this.done = true;
			this.percentage = 1.0;
		}
		this.element.style.height = (this.calculation(this.percentage))*this.to;
	}
	job.quickEnd = function() {
		this.finalize();
		this.finalize = function() {};
		this.done = true;
	}
	job.start = function() {
		SLib.animationBackend.addJob(this);
	}
	return job;
};
SLib.hideByOpacity = function(element, time, finalize, to, calculation) {
	if(!time)
		time = 250;
	if(!to)
		to = 0.0;
	if(!calculation)
		calculation = function(percentage) {return percentage;};
	if(!finalize)
		finalize = function() {};

	var job = new SLib.animationBackend.basicJob();

	job.element = element;
	job.to = to;
	job.from = parseInt(window.getComputedStyle(element, null).opacity);
	job.totalTime = time;
	job.calculation = calculation;
	job.customFinalize = finalize;
	job.finalize = function() {
		element.style.display = "none";
		element.style.opacity = this.from;
		this.customFinalize(this.element);
	};
	job.think = function() {
		this.percentage = this.time/this.totalTime;
		if(this.percentage >= 1.0) {
			this.done = true;
			this.percentage = 1.0;
		}
		var test = this.from+(this.calculation(this.percentage))*(this.to-this.from);
		this.element.style.opacity = test;
	}
	job.quickEnd = function() {
		this.finalize();
		this.finalize = function() {};
		this.done = true;
	}
	job.start = function() {
		SLib.animationBackend.addJob(this);
	}
	return job;
};
SLib.showByOpacity = function(element, time, to, finalize, calculation) {
	if(!time)
		time = 250;
	if(!to)
		to = 1.0;
	if(!calculation)
		calculation = function(percentage) {return percentage;};
	if(!finalize)
		finalize = function() {};

	var job = new SLib.animationBackend.basicJob();

	job.element = element;
	element.style.opacity = 0.0;
	element.style.display = "block";
	job.to = to;
	job.from = 0.0;
	job.totalTime = time;
	job.calculation = calculation;
	job.customFinalize = finalize;
	job.finalize = function() {
		element.style.opacity = this.to;
		element.style.display = "block";
		this.customFinalize();
	};
	job.think = function() {
		this.percentage = this.time/this.totalTime;
		if(this.percentage >= 1.0) {
			this.done = true;
			this.percentage = 1.0;
		}
		var test = this.to*(this.calculation(this.percentage));
		this.element.style.opacity = test;
	}
	job.quickEnd = function() {
		this.finalize();
		this.finalize = function() {};
		this.done = true;
	}
	job.start = function() {
		SLib.animationBackend.addJob(this);
	}
	return job;
};
