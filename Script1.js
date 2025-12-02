// دالة إظهار الصفحة: تخفي جميع الصفحات وتُظهر الصفحة المطلوبة فقط
function showPage(pageId) {
    // إخفاء جميع العناصر التي تحمل الفئة 'page'
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // إظهار العنصر المحدد بواسطة pageId
    document.getElementById(pageId).classList.add('active');
}

// **الدالة الجديدة: للتسجيل وإنشاء حساب (Sign Up)**
function handleSignup(form) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();

    // التحقق من الحقول فارغة
    if (!username || !password || !confirmPass) {
        alert("Please fill in all fields.");
        return false;
    }

    // 1. التحقق من تطابق كلمات المرور
    if (password !== confirmPass) {
        alert("Error: Passwords do not match. Please try again.");
        return false;
    }

    // 2. التحقق مما إذا كان المستخدم موجوداً بالفعل
    // إذا كان هناك بيانات مسجلة، نعتبرها حساب واحد موجود بالفعل
    if (localStorage.getItem('registeredUser')) {
        alert("Account already exists. Please Log In or clear your browser storage to create a new one.");
        return false;
    }

    // 3. حفظ بيانات المستخدم في التخزين المحلي (localStorage)
    const userData = { username: username, password: password };
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    alert(`Account created successfully for user: ${username}! You can now Log In.`);

    // مسح حقول التسجيل والتركيز على حقول الدخول
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('loginUsername').value = username; // ملء اسم المستخدم تلقائيًا لتسهيل الدخول
    document.getElementById('loginPassword').focus();

    return false;
}

// **الدالة الجديدة: لتسجيل الدخول (Login)**
function handleLogin(form) {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value.trim();
    const loginPassword = document.getElementById('loginPassword').value.trim();

    // 1. التحقق من وجود بيانات مسجلة في المتصفح
    const storedUserData = localStorage.getItem('registeredUser');

    if (!storedUserData) {
        alert("No registered user found. Please create an account first by using the 'Sign Up' section.");
        return false;
    }

    const userData = JSON.parse(storedUserData);

    // 2. التحقق من تطابق البيانات
    if (loginUsername === userData.username && loginPassword === userData.password) {
        alert("Login Successful! Welcome back.");
        // **الخطوة الصحيحة للانتقال للصفحة المطلوبة بعد الدخول**
        showPage('welcomePage');
    } else {
        alert("Login Failed. Incorrect username or password.");
    }
    return false;
}


// ************************************************************
// دالة حساب المخاطر وعرض النتيجة (لم تتغير)
// ************************************************************
function calculateAndShowResult(form) {
    event.preventDefault();

    let totalRiskPoints = 0;

    // تحديد النقاط لكل سؤال بناءً على الأهمية النسبية:
    // Q1: تاريخ عائلي = 4
    if (form.elements['Q1'].value === 'yes') { totalRiskPoints += 4; }
    // Q2: العمر (> 50) = 3
    if (form.elements['Q2'].value === 'yes') { totalRiskPoints += 3; }
    // Q3: التدخين = 3
    if (form.elements['Q3'].value === 'yes') { totalRiskPoints += 3; }
    // Q4: الكحول = 2
    if (form.elements['Q4'].value === 'yes') { totalRiskPoints += 2; }
    // Q5: التهاب مزمن = 2
    if (form.elements['Q5'].value === 'yes') { totalRiskPoints += 2; }
    // Q6: سمنة = 2
    if (form.elements['Q6'].value === 'yes') { totalRiskPoints += 2; }
    // Q7: التعرض الكيميائي = 1
    if (form.elements['Q7'].value === 'yes') { totalRiskPoints += 1; }
    // Q8: لحوم مصنعة = 1
    if (form.elements['Q8'].value === 'yes') { totalRiskPoints += 1; }
    // Q9: قلة التمارين = 1
    if (form.elements['Q9'].value === 'yes') { totalRiskPoints += 1; }
    // Q10: توتر = 1
    if (form.elements['Q10'].value === 'yes') { totalRiskPoints += 1; }


    let nextPageId;
    let riskLevel;

    // تحديد مستويات الخطر (الحد الأقصى للنقاط = 20):
    if (totalRiskPoints >= 15) {
        riskLevel = "High";
        nextPageId = "highRiskPage";
        alert(`Risk Assessment Complete: Your result is ${riskLevel}. Please proceed to the next page for recommendations.`);
    }
    else if (totalRiskPoints >= 8) {
        riskLevel = "Moderate";
        nextPageId = "mediumRiskPage";
        alert(`Risk Assessment Complete: Your result is ${riskLevel}. Please proceed to the next page for recommendations.`);
    }
    else {
        riskLevel = "Low";
        nextPageId = "lowRiskPage";
        alert(`Risk Assessment Complete: Your result is ${riskLevel}. Please proceed to the next page for recommendations.`);
    }

    showPage(nextPageId);
    return false;
}

// عند تحميل الصفحة بالكامل، ابدأ بصفحة الدخول (loginPage)
document.addEventListener('DOMContentLoaded', () => {
    showPage('loginPage');
});