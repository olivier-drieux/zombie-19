// Vous devez donc reproduire une fonction capable d’infecter un arbre de données contenant des personnes. Bien entendu votre ZOMBIE-19 devra faire la différence entre les personnes seules et groupées pour mieux déployer le virus ! Chaque personne aura un nom et un âge et un statut d’infection vous devrez faire en sorte de répandre le virus à l’ensemble des personnes d’un groupe qui contient une personne infectée. Bien entendu dans chaque groupe une personne infectée pourra avoir côtoyer d’autres personnes qui font elle-même partie d’un groupe. Vous devrez donc faire en sorte que le ZOMBIE-19 infecte et se répande sur toutes les personnes qui sont entrées en contact.

// Vous avez réalisé la premier séquençage du virus à présent il vous faut créer les variants:
// Vous devrez créer des variants :
// Zombie-A : Qui infecte du haut vers le bas. (les personnes de touts les groupes sociaux Descendant)
// Zombie-B : Qui infecte du bas vers le haut. (les personnes de touts les groupes sociaux Ascendant)
// Zombie-32 : Qui infecte du bas vers le haut et du haut vers le bas toutes personnes qui à 32 ans et plus. (de tout les groupes social Ascendant et Descendant)
// Zombie-C : Qui infecte une personne sur 2 dans un groupe social (mais pas les groupes sociaux en contact Ascendant ou Descendant)
// Zombie-Ultime : Qui infecte seulement la personne racine la plus Ascendante (La personne la plus haute de tous les cercles sociaux)

// Vous allez devoir utiliser votre arbre d’infectés après le passage du virus et soigner le monde.
// En fonction des variants qui ont propagé l’infection une première fois vous allez devoir déployer les vaccins suivants :
// Vaccin-A.1 contre Zombie-A et Zombie-32 : N’est pas encore très efficace il permet de soigner toutes les personnes d’un âge compris entre 0 ans et 30 ans et de les immuniser contre tous les variants (Ascendant et Descendant)
// Vaccin-B.1 contre Zombie-B et Zombie-C : Il tue une personne sur 2 et soigne les autres mais ne leur donne pas l’immunité. (Ascendant et Descendant)
// Vaccin-Ultime contre Zombie-Ultime : Son porteur ne pourra plus jamais être infecté et infecter les autres.

let tree = {
    name: "Théo",
    isImmune: false,
    canInfect: true,
    isDead: false,
    age: 23,
    variants: ["Zombie-A"],
    children: [
        {
            name: "Sophie",
            isImmune: false,
            canInfect: true,
            isDead: false,
            age: 25,
            variants: [],
            children: [
                {
                    name: "Emma",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 22,
                    variants: [],
                    children: [
                        {
                            name: "Quentin",
                            isImmune: false,
                            canInfect: true,
                            isDead: false,
                            age: 33,
                            variants: ["Zombie-B"],
                            children: []
                        }
                    ]
                },
                {
                    name: "Noah",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 45,
                    variants: [],
                    children: []
                }
            ]
        },
        {
            name: "Antoine",
            isImmune: false,
            canInfect: true,
            isDead: false,
            age: 32,
            variants: ["Zombie-C"],
            children: [
                {
                    name: "Julie",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 24,
                    variants: ["Zombie-32"],
                    children: []
                },
                {
                    name: "Pierre",
                    isImmune: false,
                    canInfect: true,
                    isDead: false,
                    age: 26,
                    variants: [],
                    children: [
                        {
                            name: "Nathalie",
                            isImmune: false,
                            canInfect: true,
                            isDead: false,
                            age: 24,
                            variants: ["Zombie-Ultime"],
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
};

function mapParentInChildren(person, parent) {
    person.children.forEach((children) => mapParentInChildren(children, person));
    person.parent = parent;
    return person;
}
function removeParentInChildren(person) {
    person.children.forEach((children) => removeParentInChildren(children));
    delete person.parent;
    return person;
}
tree = mapParentInChildren(tree, null);


/***********************
 * Logique d'infection *
 ***********************/

// Condition pour savoir si une personne peut être infecté
function canBeInfected(person, variant, conditionFn = () => true) {
    return person.canInfect === true &&
        person.isImmune === false &&
        person.isDead === false &&
        person.variants.includes(variant) === false &&
        conditionFn(person);
}

// Infection du haut vers le bas avec condition optionnelle
function infectToptoBottom(person, variant, conditionFn) {
    if (canBeInfected(person, variant, conditionFn)) {
        console.log(`${person.name} a été infecté par ${variant}`);
        person.variants.push(variant);
    }

    person.children.forEach((children) => infectToptoBottom(children, variant, conditionFn));
}

// Infection du bas vers le haut avec condition optionnelle
function infectBottomToTop(person, variant, conditionFn) {
    if (canBeInfected(person, variant, conditionFn)) {
        console.log(`${person.name} a été infecté par le virus ${variant}`);
        person.variants.push(variant);
    }

    if (person.parent !== null) {
        infectBottomToTop(person.parent, variant, conditionFn);
    }
}

// Infection alternée
function infectAlternate(person, variant) {
    person.children.forEach((children, index) => {
        if (canBeInfected(person, variant, () => index % 2 === 0)) {
            children.variants.push(variant);
        }
    });
}
// Processus d'infection de l'arbre
function infect(person) {
    person.variants.forEach((variant) => {
        switch (variant) {
            // Zombie-A : Qui infecte du haut vers le bas. (les personnes de touts les groupes sociaux Descendant)
            case 'Zombie-A':
                infectToptoBottom(person, 'Zombie-A');
                break;
            // Zombie-B : Qui infecte du bas vers le haut. (les personnes de touts les groupes sociaux Ascendant)
            case 'Zombie-B':
                infectBottomToTop(person, 'Zombie-B');
                break;
            // Zombie-32 : Qui infecte du bas vers le haut et du haut vers le bas toutes personnes qui à 32 ans et plus. (de tout les groupes social Ascendant et Descendant)
            case 'Zombie-32':
                infectToptoBottom(person, 'Zombie-32', (person) => person.age >= 32);
                infectBottomToTop(person, 'Zombie-32', (person) => person.age >= 32);
                break;
            // Zombie-C : Qui infecte une personne sur 2 dans un groupe social (mais pas les groupes sociaux en contact Ascendant ou Descendant)
            case 'Zombie-C':
                infectAlternate(person, 'Zombie-C');
                break;
            // Zombie-Ultime : Qui infecte seulement la personne racine la plus Ascendante (La personne la plus haute de tous les cercles sociaux)
            case 'Zombie-Ultime':
                infectBottomToTop(person, 'Zombie-Ultime', (person) => person.parent === null);
                break;
        }
    });

    person.children.map((children) => infect(children));
}

/**************************
 * Logique de vaccination *
 *************************/

// Vaccin-A.1 contre Zombie-A et Zombie-32 : N’est pas encore très efficace il permet de soigner toutes les personnes d’un âge compris entre 0 ans et 30 ans et de les immuniser contre tous les variants (Ascendant et Descendant)
function a1Vaccine(person) {
    if ((person.variants.includes('Zombie-A') || person.variants.includes('Zombie-32'))) {
        if (person.age <= 30) {
            console.log(`${person.name} (${person.age} ans) a été vacciné et est immunisé contre tous les variants.`);
            person.variants = [];
            person.isImmune = true;
        } else {
            console.log(`${person.name} (${person.age} ans) est trop vieux, le vaccin est inefficace.`);
        }
    }
    person.children.map((children) => a1Vaccine(children));
}

// Vaccin-B.1 contre Zombie-B et Zombie-C : Il tue une personne sur 2 et soigne les autres mais ne leur donne pas l’immunité. (Ascendant et Descendant)
function b1Vaccine(person) {
    if ((person.variants.includes('Zombie-B') || person.variants.includes('Zombie-C'))) {
        if (indexOfDeath % 2 === 0) {
            console.log(`${person.name} a été vacciné et n'est plus infecté par le virus Zombie-B et Zombie-C.`);
            person.variants = person.variants.filter((variant) => variant !== 'Zombie-B' && variant !== 'Zombie-C');
        } else {
            console.log(`${person.name} a été tué par le vaccin.`);
            person.isDead = true;
        }
        indexOfDeath++;
    }
    person.children.map(children => b1Vaccine(children));
}

// Vaccin-Ultime contre Zombie-Ultime : Son porteur ne pourra plus jamais être infecté et infecter les autres.
function ultimateVaccine(person) {
    if (person.variants.includes('Zombie-Ultime')) {
        console.log(`${person.name} a été vacciné et ne pourra plus jamais être infecté et infecter les autres.`);
        person.variants = person.variants = [];
        person.isImmune = true;
        person.canInfect = false;
    }
    person.children.map((children) => ultimateVaccine(children));
}

/**********************
 * Début du programme *
 *********************/

console.log('----------------------------------------')
console.log(`L'infection commence...`);
infect(tree);

console.log('----------------------------------------')
console.log('Déploiement du vaccin A1...');
a1Vaccine(tree);

console.log('----------------------------------------')
console.log('Déploiement du vaccin B1...');
let indexOfDeath = 0;
b1Vaccine(tree);

console.log('----------------------------------------')
console.log('Déploiement du vaccin Ultime...');
ultimateVaccine(tree);

/************
 * Résultat *
 ***********/

tree = removeParentInChildren(tree);
console.dir(tree, { depth: null });
