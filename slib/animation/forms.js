SLib.invalidateInput = function(element, time, background, border) {
	if(!time)
		time = 1500;
	if(!border)
		border = new SLib.color("#ff0000");
	else
		// make sure it's a color object, if already, it just copys the values
		border = new SLib.color(border);
	if(!background)
		background = new SLib.color("#ffd2d2");
	else
		background = new SLib.color(background);
	
	var job = new SLib.animationBackend.basicJob();
	
	job.bgs = new SLib.color(window.getComputedStyle(element, null).backgroundColor);
	if(window.getComputedStyle(element, null).borderColor == "")
		job.bos = new SLib.color(window.getComputedStyle(element, null).borderLeftColor);
	else
		job.bos = new SLib.color(window.getComputedStyle(element, null).borderColor);
	job.bgt = background;
	job.bot = border;
	job.element = element;
	job.totalTime = time;
	
	job.think = function() {
		this.percentage = this.time/this.totalTime;
		if(this.percentage >= 1.0) {
			this.done = true;
			this.percentage = 1.0;
		}
		this.element.style.borderColor = SLib.animationBackend.colorFade(this.bos, this.bot, this.percentage);
		this.element.style.backgroundColor = SLib.animationBackend.colorFade(this.bgs, this.bgt, this.percentage);
	}
	
	SLib.animationBackend.addJob(job);
}
SLib.validateInput = function(element, time, background, border) {
	if(!time)
		time = 1500;
	if(!border)
		border = new SLib.color("#55B05A");
	else
		// make sure it's a color object, if already, it just copys the values
		border = new SLib.color(border);
	if(!background)
		background = new SLib.color("#bbffbb");
	else
		background = new SLib.color(background);
	
	var job = new SLib.animationBackend.basicJob();
	
	job.bgs = new SLib.color(window.getComputedStyle(element, null).backgroundColor);
	if(window.getComputedStyle(element, null).borderColor == "")
		job.bos = new SLib.color(window.getComputedStyle(element, null).borderLeftColor);
	else
		job.bos = new SLib.color(window.getComputedStyle(element, null).borderColor);
	job.bgt = background;
	job.bot = border;
	job.element = element;
	job.totalTime = time;
	
	job.think = function() {
		this.percentage = this.time/this.totalTime;
		if(this.percentage >= 1.0) {
			this.done = true;
			this.percentage = 1.0;
		}
		this.element.style.borderColor = SLib.animationBackend.colorFade(this.bos, this.bot, this.percentage);
		this.element.style.backgroundColor = SLib.animationBackend.colorFade(this.bgs, this.bgt, this.percentage);
	}
	
	SLib.animationBackend.addJob(job);
}