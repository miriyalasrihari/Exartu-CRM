Enums = {};
_.extend(Enums, {
    hierarchiesRelation: {
        isParent: 1,
        isChild: -1,
        notRelated: 0,
    },
    fieldType: {
        string: 0,
        int: 1,
        date: 2,
        select: 3,
        checkbox: 4,
        lookUp: 5
    },
    activitiesType: {
        contactableAdd: 0,
        messageAdd: 1,
        taskAdd: 2,
        jobAdd: 3
    },
    objGroupType: {
        contactable: 'contactable',
        job: 'job',
        deal: 'deal',
        quote: 'quote'
    },
    personType: {
        human: 'person',
        organization: 'organization'
    },
    roleFunction: {
        System_Administrator: 'System_Administrator',
        Tenant_Administrator: 'Tenant_Administrator',
        Recruiter_Consultant: 'Recruiter_Consultant',
        Staffing_Specialist: 'Recruiter_Consultant',
        Hiring_Manager: 'Hiring_Manager',
        Sales_Manager: 'Sales_Manager',
        Sales_Executive: 'Sales_Executive',
        Job_Applicant: 'Recruiter_Consultant',
        Contract_Employee: 'Recruiter_Consultant',
        Direct_Employee: 'Direct_Employee'
    },
    permissionFunction: {
        Sysadmin: 'SysAdmin',
        TenantAdmin: 'TenantAdmin',
        CRM: 'CRM',
        Sales: 'Sales',
        Recruiting: 'Recruiting'

    },
    candidateType: {
        recruiter: 'recruiter'
    },
    taskState: {
        future: 'Future',
        complited: 'Completed',
        pending: 'Pending',
        closed: 'Closed',
    },
    contactMethodTypes: [
        {
            code: 0,
            displayName: 'Other'
        },
        {
            code: 1,
            displayName: 'Cell phone'
        },
        {
            code: 2,
            displayName: 'Linkedin'
        },
        {
            code: 3,
            displayName: 'Gmail'
        },
        {
            code: 4,
            displayName: 'Hotmail'
        },
        {
            code: 5,
            displayName: 'Twitter'
        }
    ]
});

/*
 *  Objects definitions
 */

fieldType = Enums.fieldType;
var person = {
    fields: [
        {
            name: 'firstName',
            displayName: 'First name',
            regex: /.*/,
            type: fieldType.string,
            defaultValue: '',
            required: true
        },
        {
            name: 'lastName',
            displayName: 'Last name',
            regex: /.*/,
            type: fieldType.string,
            defaultValue: '',
            required: true
        },
        {
            name: 'middleName',
            displayName: 'Middle name',
            regex: /.+/,
            type: fieldType.string,
            defaultValue: ''
        },
        {
            name: 'jobTitle',
            displayName: 'Job title',
            regex: /.+/,
            type: fieldType.string,
            defaultValue: ''
        },
        {
            name: 'salutation',
            displayName: 'Salutation',
            regex: /.+/,
            type: fieldType.string,
            defaultValue: ''
        }
    ]
};

var organization = {
    fields: [
        {
            name: 'organizationName',
            displayName: 'Organization name',
            regex: /.*/,
            type: fieldType.string,
            defaultValue: '',
            required: true
        }
    ]
}

var job = {
    fields: [
        {
            name: 'publicJobTitle',
            displayName: 'Public job title',
            regex: /.*/,
            fieldType: fieldType.string,
            defaultValue: '',
            required: true,
            showInAdd: true
        }, {
            name: 'description',
            displayName: 'Description',
            regex: /.*/,
            fieldType: fieldType.string,
            defaultValue: '',
            required: false,
            showInAdd: true
        }, {
            name: 'startDate',
            displayName: 'Start date',
            fieldType: fieldType.date,
            defaultValue: null,
            required: true,
            showInAdd: true
        }, {
            name: 'endDate',
            displayName: 'End date',
            fieldType: fieldType.date,
            defaultValue: null,
            required: true,
            showInAdd: true
        }, {
            name: 'duration',
            displayName: 'Duration',
            fieldType: fieldType.lookUp,
            lookUpName: 'jobDuration',
            defaultValue: 0,
            required: true,
            showInAdd: true,
            multiple: false,
        }, {
            name: 'status',
            displayName: 'Status',
            fieldType: fieldType.lookUp,
            lookUpName: 'jobStatus',
            required: true,
            lookUpName: 'jobTitle',
            multiple: false,
            defaultValue: 0,
            showInAdd: true
        }, {
            name: 'industry',
            displayName: 'Industry',
            tyfieldTypepe: fieldType.lookUp,
            lookUpName: 'jobIndustry',
            required: true,
            lookUpName: 'jobTitle',
            multiple: false,
            defaultValue: 0,
            showInAdd: true
        }, {
            name: 'category',
            displayName: 'Category',
            fieldType: fieldType.lookUp,
            lookUpName: 'jobCategory',
            required: true,
            lookUpName: 'jobTitle',
            multiple: false,
            defaultValue: 0,
            showInAdd: true
        },
    ]
}

Global = {};

var generateObject = function (object) {
    var names = _.map(object.fields, function (item) {
        return item.name;
    });
    var values = _.map(object.fields, function (item) {
        return item.defaultValue;
    })
    return _.object(names, values);
}
_.extend(Global, {
    defaultEmployeePicture: '/assets/user-photo-placeholder.jpg'
});
_.extend(Global, {
    // person
    personFields: person.fields,
    person: function () {
        return generateObject(person);
    },
    // organization
    organizationFields: organization.fields,
    organization: function () {
        return generateObject(organization);
    },
    // job
    jobFields: job.fields,
    job: function () {
        return generateObject(job);
    }
});