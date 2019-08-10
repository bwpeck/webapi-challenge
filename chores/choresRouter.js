const router = require('express').Router()

const people = [
    {
        id: 1,
        name: "Frodo Baggins",
        chores: [
            {
                id: 1,
                description: 'take the ring to Mordor',
                notes: 'make your way to Mount Doom',
                assignedTo: 1, // the id of Frodo,
                completed: true
            },
        ]
    },
    {
        id: 2,
        name: "Harry Plotter",
        chores: [
            {
                id: 1,
                description: 'smite hewhoshallnotbenamed',
                notes: 'ugly no nose evil dude',
                assignedTo: 2,
                completed: false
            }
        ]
    },
    {
        id: 3,
        name: "Mufasa",
        chores: [
            {
                id: 1,
                description: 'Simba',
                notes: 'needs a bath',
                assignedTo: 3,
                completed: true
            },
        ]
    },
    {
        id: 4,
        name: "Tank Girl",
        chores: [
            {
                id: 1,
                description: 'Stop Water Barons',
                notes: 'bring jetgirl',
                assignedTo: 4,
                completed: true
            },
        ]
    },
    {
        id: 5,
        name: "IronMan",
        chores: [
            {
                id: 1,
                description: 'Dont Die',
                notes: 'Oh wait, too late',
                assignedTo: 5,
                completed: true
            },
        ]
    },

]

router.get('/', (req, res) => {
    res.status(200).json(people);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    let [Person] = people.filter(person => person.id == id);
    if (Person) {
        res.status(200).json(Person);
    } else {
        res.status(400).json({ message: "Oopsie! We couldn't find that user!" })
    }
})

router.get('/:id/chores', (req, res) => {
    const id = req.params.id;
    const completed = req.query.completed

    let [Person] = people.filter(person => person.id == id);

    if (Person) {
        if (completed == "true") {
            let completedChores = Person.chores.filter(chore => chore.completed === true)

            res.status(200).json(completedChores)
        } else {
            res.status(200).json(Person.chores)
        }
    } else {
        res.status(400).json({ message: "Oopsie! We couldn't find that user!" })
    }
})

router.post('/:id/chores', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    let [Person] = people.filter(person => person.id == id);
    if (!body.assignedTo) {
        res.status(404).json({ message: "You forgot the assignedTo key" })
    }
    else if (Person) {
        Person.chores.push(body);
        res.status(200).json(Person.chores)
    } else {
        res.status(400).json({ message: "Oopsie! We couldn't find that user!" })
    }
})

router.put('/:id/chores', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    let [Person] = people.filter(person => person.id == id);
    if (!body.assignedTo && !body.id) {
        res.status(404).json({ message: "You forgot the assignedTo key and username" })
    }
    else if (Person) {
        let newChores = Person.chores.filter(chore => chore.id != body.id);
        Person.chores = [...newChores, body]
        res.status(200).json(Person.chores)
    } else {
        res.status(400).json({ message: "Oopsie! We couldn't find that user!" })
    }
})

router.delete('/:id/chores/:choreId', (req, res) => {
    const userId = req.params.id;
    const choreId = req.params.choreId
    let [Person] = people.filter(person => person.id == userId);
    let newChores = Person.chores.filter(chore => chore.id != choreId)
    if (Person) {
        Person.chores = [...newChores]
        res.status(200).json(Person.chores)
    } else {
        res.status(400).json({ message: "Oopsie! We couldn't find that user!!" })
    }
})

module.exports = router;