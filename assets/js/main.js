class Learner {
	constructor(lastName, firstName, gender, birthDate, allergies) {
		this.lastName = lastName;
		this.firstName = firstName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.allergies = allergies;
	}

	isAllergicTo(allergen) {
		if (allergen == (allergen & this.allergies)){
			return true;
		} else {
			return false;
		}
	}

	getAge() {
		var now = new Date();
		var ageInMs = now.getTime() - this.birthDate.getTime();
		return Math.round(ageInMs / 31556952000);
	}

}

var lastNames = ["Laurent", "Kepl-Danet", "Mellec", "Grondin", "Anschutz", "Mendoza", "El Haddioui", "Massiot", "Rouxel", "Gervais", "Hennebert", "Cormier", "Guillou", "Seite", "Maigne", "Abdi Djama", "Beauverger", "Dubois", "Delcourt", "Bouttier", "Douard", "Le roux"];
var firstNames = ["Benoit", "Alice", "Benjamin", "Jean-Claude", "Jessica", "Claudia", "Mhamed", "Francois", "Florian", "Roxane", "Léa", "Marine", "Jonathan", "Romain", "Eliez", "Bilane", "Alexandre", "Vassily", "Déborah", "Carole"];
var birthDateBoundaries = [new Date( new Date() - 1577847600000), new Date( new Date() - 504911232000)];
var learners = [];
var genders = [];
var genderRatio = 0;
var numberOfWomens = 0;
var youngerLearnerAge = 'undefined';
var olderLearnerAge = 'undefined';
var ageSum = 0;
var middleAge = 0;
var globalInfo = document.getElementById('global-info');
var learnersArray = document.getElementById('learners-array');

function generateClass(numberOfStudents, lastNames, firstNames, genderRatioPercentages, birthDateBoundaries) {
	// Generate the Gender Ratio Percentage Array
	for (var i = 0; i < genderRatioPercentages; i++){
		genders.push('F');
	}
	for (var i = 0; i < 100 - genderRatioPercentages; i++){
		genders.push('M');
	}

	var i = 0;
	while ( i < numberOfStudents ){
		var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		var gender = genders[Math.floor(Math.random() * genders.length)];
		var birthDate = new Date(+birthDateBoundaries[0] + Math.random() * (birthDateBoundaries[1] - birthDateBoundaries[0]));
		var allergies = Math.floor(Math.random()* 1025);
		learners.push(new Learner(lastName, firstName, gender, birthDate, allergies));

		i++;
	}
}

generateClass(24, lastNames, firstNames, 25, birthDateBoundaries);

learners.forEach(function(learner){
	// Gender Ratio
	if ( learner.gender == 'F'){
		numberOfWomens++;
	}

	// Younger Learner
	if ( learner.getAge() < youngerLearnerAge || youngerLearnerAge == 'undefined'){
		youngerLearnerAge = learner.getAge();
	}

	// Middle Age
	ageSum += learner.getAge();

	// Older Learner
	if ( learner.getAge() > olderLearnerAge || olderLearnerAge == 'undefined'){
		olderLearnerAge = learner.getAge();
	}

	// learners-array
	var wrapper = document.createElement('div');
	if (learner.isAllergicTo(1)){ wrapper.classList.add('eggs'); }
	if (learner.isAllergicTo(2)){ wrapper.classList.add('peanuts'); }
	if (learner.isAllergicTo(4)){ wrapper.classList.add('shellfish'); }
	if (learner.isAllergicTo(8)){ wrapper.classList.add('strawberrys'); }
	if (learner.isAllergicTo(16)){ wrapper.classList.add('tomato'); }
	if (learner.isAllergicTo(32)){ wrapper.classList.add('chocolate'); }
	if (learner.isAllergicTo(64)){ wrapper.classList.add('pollen'); }
	if (learner.isAllergicTo(128)){ wrapper.classList.add('cats'); }
	if (learner.isAllergicTo(256)){ wrapper.classList.add('milk'); }
	if (learner.isAllergicTo(512)){ wrapper.classList.add('mites'); }
	wrapper.classList.add('learner');
	wrapper.innerHTML = 'Last Name : '+ learner.lastName +'<br>First Name : '+ learner.firstName +'<br>Gender : '+ learner.gender +'<br>Birth Date : '+ learner.birthDate.toLocaleString() +'<br> Age : '+ learner.getAge() +'<br>Allergies Code : '+	learner.allergies +'<br>Is Allergic To Eggs: '+ learner.isAllergicTo(1) +'<br>Is Allergic To Peanuts : '+ learner.isAllergicTo(2) +'<br>Is Allergic To Shellfish : '+ learner.isAllergicTo(4) +'<br>Is Allergic To Strawberrys : '+ learner.isAllergicTo(8) +'<br>Is Allergic To Tomato : '+ learner.isAllergicTo(16) +'<br>Is Allergic To Chocolate : '+ learner.isAllergicTo(32) +'<br>Is Allergic To Pollen : '+ learner.isAllergicTo(64) +'<br>Is Allergic To Cats : '+ learner.isAllergicTo(128) +'<br>Is Allergic To Milk : '+ learner.isAllergicTo(256)  +'<br>Is Allergic To Mites : '+ learner.isAllergicTo(512);
	learnersArray.appendChild(wrapper);
});

genderRatio = (numberOfWomens * 100)/learners.length;
midlleAge = Math.round(ageSum / learners.length);

globalInfo.innerHTML = 'There is '+ genderRatio.toFixed() +'% Women in the Class.<br>The younger Learner is '+ youngerLearnerAge +' years old.<br>The middle age is '+ midlleAge +'.<br>The older Learner is '+ olderLearnerAge +' years old.';
