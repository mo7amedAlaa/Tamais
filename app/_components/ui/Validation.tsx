/*
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    formValidation(formRef.current, {
      fields: {
        firstName: {
          validators: {
            notEmpty: {
              message: "يرجي ادخال الاسم الاول",
            },
            stringLength: {
              min: 3,
              max: 30,
              message: "يجب أن يكون اسم المستخدم أكثر من 6 وأقل من 30 حرفًا",
            },
            regexp: {
              regexp: /^[\p{L}\s]*$/u,
              message: "الاسم يجب أن يحتوي فقط على حروف",
            },
          },
        },
        secondName: {
          validators: {
            notEmpty: {
              message: "يرجي ادخال الاسم الثاني",
            },
            stringLength: {
              min: 3,
              max: 30,
              message: "يجب أن يكون اسم المستخدم أكثر من 6 وأقل من 30 حرفًا",
            },
            regexp: {
              regexp: /^[\p{L}\s]*$/u,
              message: "الاسم يجب أن يحتوي فقط على حروف",
            },
          },
        },
        forthName: {
          validators: {
            notEmpty: {
              message: "يرجي ادخال الاسم الرابع",
            },
            stringLength: {
              min: 3,
              max: 30,
              message: "يجب أن يكون اسم المستخدم أكثر من 6 وأقل من 30 حرفًا",
            },
            regexp: {
              regexp: /^[\p{L}\s]*$/u,
              message: "الاسم يجب أن يحتوي فقط على حروف",
            },
          },
        },
        phoneNum: {
          validators: {
            notEmpty: {
              message: "يرجى إدخال رقم الهاتف",
            },
            regexp: {
              regexp: /^[0-9]*$/,
              message: "رقم الهاتف يجب أن يحتوي فقط على أرقام",
            },
          },
        },

        email: {
          validators: {
            notEmpty: {
              message: "يرجى إدخال البريد الإلكتروني",
            },
            emailAddress: {
              message: "يرجى إدخال بريد إلكتروني صحيح",
            },
            regexp: {
              regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "يرجى إدخال بريد إلكتروني صحيح",
            },
          },
        },
        password: {
          validators: {
            notEmpty: {
              message: "يرجى إدخال كلمة المرور",
            },
            stringLength: {
              min: 8,
              message: "يجب أن تكون كلمة المرور على الأقل 8 أحرف",
            },
            regexp: {
              regexp:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "يرجى إدخال بريد إلكتروني صحيح",
            },
          },
        },
        confirmPassword: {
          validators: {
            notEmpty: {
              message: "يرجى تأكيد كلمة المرور",
            },
            identical: {
              compare: () => {
                const passwordField =
                  formRef.current?.querySelector<HTMLInputElement>(
                    '[name="password"]'
                  );
                return passwordField ? passwordField.value : "";
              },
              message: "كلمتا المرور غير متطابقتين",
            },
          },
        },
        description: {
          validators: {
            notEmpty: {
              message: "يجب إدخال الوصف",
            },
          },
        },
        day: {
          validators: {
            notEmpty: {
              message: "يجب اختيار اليوم",
            },
          },
        },
        month: {
          validators: {
            notEmpty: {
              message: "يجب اختيار الشهر",
            },
          },
        },
        year: {
          validators: {
            notEmpty: {
              message: "يجب اختيار السنة",
            },
          },
        },
        gender: {
          validators: {
            notEmpty: {
              message: "يجب اختيار الجنس",
            },
          },
        },
        degree: {
          validators: {
            notEmpty: {
              message: "يجب اختيار الدرجة العلمية",
            },
          },
        },
        accurateSpeciality: {
          validators: {
            notEmpty: {
              message: "يجب اختيار التخصص الدقيق",
            },
          },
        },
        generalSpeciality: {
          validators: {
            notEmpty: {
              message: "يجب اختيار التخصص العام",
            },
          },
        },
        city: {
          validators: {
            notEmpty: {
              message: "يجب اختيار المدينة",
            },
          },
        },
        region: {
          validators: {
            notEmpty: {
              message: "يجب اختيار المنطقة",
            },
          },
        },
        district: {
          validators: {
            notEmpty: {
              message: "يجب اختيار الحي",
            },
          },
        },
        section: {
          validators: {
            notEmpty: {
              message: "يجب اختيار القسم",
            },
          },
        },
        country: {
          validators: {
            notEmpty: {
              message: "يجب اختيار البلد",
            },
          },
        },
        lawyerType: {
          validators: {
            notEmpty: {
              message: "يجب اختيار نوع المحامي",
            },
          },
        },
        idType: {
          validators: {
            notEmpty: {
              message: "يجب اختيار نوع الهوية",
            },
          },
        },
        idNumber: {
          validators: {
            notEmpty: {
              message: "يجب إدخال رقم الهوية",
            },
          },
        },
        lawyerSection: {
          validators: {
            notEmpty: {
              message: "يجب اختيار قسم المحاماة",
            },
          },
        },
        functionalCase: {
          validators: {
            notEmpty: {
              message: "يجب اختيار الحالة الوظيفية",
            },
          },
        },
        lawyerNationality: {
          validators: {
            notEmpty: {
              message: "يجب اختيار الجنسية",
            },
          },
        },
        userCvFile: {
          validators: {
            file: {
              message: "يجب إرفاق ملف السيرة الذاتية",
            },
          },
        },
        companyLicensesFile: {
          validators: {
            file: {
              message: "يجب إرفاق ملف التراخيص للشركة",
            },
          },
        },
        userIdFile: {
          validators: {
            file: {
              message: "يجب إرفاق ملف الهوية",
            },
          },
        },
        licensesNumFile: {
          validators: {
            file: {
              message: "يجب إرفاق ملف أرقام التراخيص",
            },
          },
        },
        degreeCertificateFile: {
          validators: {
            file: {
              message: "يجب إرفاق ملف الشهادة العلمية",
            },
          },
        },
        logoFile: {
          validators: {
            file: {
              message: "يجب إرفاق ملف الشعار",
            },
          },
        },
      },
      plugins: {
        trigger: new Trigger(),
      },
    }).validate();
    /*
     .then((isValid, errors) => {
        if (!isValid) {
          console.log(errors);
        } else {
        }
      });
    };
 */
