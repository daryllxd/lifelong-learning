## Creating Paths

    get '/patients/:id', to: 'patients#show', as: 'patient'
    @patient = Patient.find(17)

Those = creates the patient_path.

    <%= link_to 'Patient Record', patient_path(@patient) %>

