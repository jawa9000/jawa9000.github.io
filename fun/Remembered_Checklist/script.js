$(document).ready(function() {
    // Function to save the state of checkboxes to localStorage
    function saveCheckboxState() {
        let state = {};

        $('input[type="checkbox"]').each(function() {
            state[$(this).attr('id')] = $(this).is(':checked');
        });
        
        localStorage.setItem('checkboxState', JSON.stringify(state));
    }

    // Function to load the state of checkboxes from localStorage
    function loadCheckboxState() {
        let state = localStorage.getItem('checkboxState');

        if (state) {
            state = JSON.parse(state);
            $('input[type="checkbox"]').each(function() {
                let id = $(this).attr('id');
                if (state[id] !== undefined) {
                    $(this).prop('checked', state[id]);
                }
            });
        }
    }

    // Initial load of checkbox states
    loadCheckboxState();

    // Save checkbox state when any checkbox is changed
    $('input[type="checkbox"]').on('change', function() {
        saveCheckboxState();
    });
});
