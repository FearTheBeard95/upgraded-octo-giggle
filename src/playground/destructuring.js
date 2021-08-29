// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {title, author = 'unknown'} = book
// const {name: publisherName = 'Self-Published'} = book.publisher

// console.log(publisherName)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [name, small, medium, large] = item

console.log(`A medium ${name} costs ${medium}`)