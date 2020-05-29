const noteList = document.querySelector('#note-list');
const form = document.querySelector('#add-note-form');

// create element & render note
function rendernote(doc) {
    let li = document.createElement('li');
    let note1 = document.createElement('span');
    let info = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    note1.textContent = doc.data().note1;
    info.textContent = doc.data().info;
    cross.textContent = 'x';

    li.appendChild(note1);
    li.appendChild(info);
    li.appendChild(cross);

    noteList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('notes').doc(id).delete();
    });
}

// getting data
// db.collection('notes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         rendernote(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('notes').add({
        note1: form.note1.value,
        info: form.info.value
    });
    form.note1.value = '';
    form.info.value = '';
});

// real-time listener
db.collection('notes').orderBy('note1').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            rendernote(change.doc);
        } else if (change.type == 'removed') {
            let li = noteList.querySelector('[data-id=' + change.doc.id + ']');
            noteList.removeChild(li);
        }
    });
});

// updating records (console demo)
// db.collection('notes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     note: 'mario world'
// });

// db.collection('notes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('notes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });