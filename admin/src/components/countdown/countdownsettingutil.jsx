

	export function calcCountdownFromMiliSeconds(miliseconds) {

		var ret = {};
		ret.days = Math.floor(miliseconds / 1000 / 60 / 60 / 24);
		miliseconds -= ret.days * 1000*60*60*24;
		ret.hours = Math.floor(miliseconds / 1000 / 60 / 60 );
		miliseconds -= ret.hours * 1000*60*60;
		ret.minutes = Math.floor(miliseconds / 1000 / 60 );
		miliseconds -= ret.minutes * 1000*60;
		ret.seconds = Math.floor(miliseconds / 1000  );
		return ret;
	}
	export function calcCountdownToMiliSeconds(days,hours,minutes,seconds) {
		return (1000*seconds)+(1000*60*minutes)+(1000*60*60*hours)+(1000*60*60*24*days);
	}