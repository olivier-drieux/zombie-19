
# TP ZOMBIE-19 - Étape 1 : L'infection

À présent, vous allez devoir implémenter une fonction capable de réaliser une pandémie. Youpi! Vous pouvez utiliser tout ce que vous avez vu précédemment.

Vous devez donc reproduire une fonction capable d’infecter un arbre de données contenant des personnes. Bien entendu, votre ZOMBIE-19 devra faire la différence entre les personnes seules et groupées pour mieux déployer le virus!

Chaque personne aura un nom, un âge et un statut d’infection. Vous devrez faire en sorte de répandre le virus à l’ensemble des personnes d’un groupe qui contient une personne infectée. Bien entendu, dans chaque groupe, une personne infectée pourra avoir côtoyé d’autres personnes qui font elles-mêmes partie d’un groupe. Vous devrez donc faire en sorte que le ZOMBIE-19 infecte et se répande sur toutes les personnes qui sont entrées en contact.

# TP ZOMBIE-19 - Étape 2 : Les Variants

À présent, vous allez devoir implémenter des variants du virus qui ont tous des propriétés particulières.

Vous avez réalisé le premier séquençage du virus. À présent, il vous faut créer les variants :

-   Zombie-A : qui infecte du haut vers le bas (les personnes de tous les groupes sociaux descendants).
-   Zombie-B : qui infecte du bas vers le haut (les personnes de tous les groupes sociaux ascendants).
-   Zombie-32 : qui infecte du bas vers le haut et du haut vers le bas toutes personnes qui ont 32 ans et plus (de tous les groupes sociaux ascendants et descendants).
-   Zombie-C : qui infecte une personne sur deux dans un groupe social (mais pas les groupes sociaux en contact ascendant ou descendant).
-   Zombie-Ultime : qui infecte seulement la personne racine la plus ascendante (la personne la plus haute de tous les cercles sociaux).

# TP ZOMBIE-19 - Étape 3 : Les Vaccins

À présent, vous allez devoir concevoir des vaccins capables de soigner toutes les personnes infectées par les variants! Le monde attend ces vaccins, vous devez absolument trouver une solution. L'avenir de l’humanité dépend de vous!

Vous allez devoir utiliser votre arbre d’infectés après le passage du virus et soigner le monde. En fonction des variants qui ont propagé l’infection une première fois, vous allez devoir déployer les vaccins suivants:

-   Vaccin-A.1 contre Zombie-A et Zombie-32: n’est pas encore très efficace, il permet de soigner toutes les personnes d’un âge compris entre 0 ans et 30 ans et de les immuniser contre tous les variants (ascendant et descendant).
-   Vaccin-B.1 contre Zombie-B et Zombie-C: il tue une personne sur deux et soigne les autres mais ne leur donne pas l’immunité (ascendant et descendant).
-   Vaccin-Ultime contre Zombie-Ultime: son porteur ne pourra plus jamais être infecté et infecter les autres.
