
// Simple premium calculator based on provided rate table (مرجع 2)
window.mountInlineAutoCalc = function(selector){
  const root = document.querySelector(selector);
  if(!root) return;
  root.innerHTML = `
    <form id="quick-calc" class="features">
      <label>فئة المركبة
        <select id="cat" required>
          <option value="خصوصي_4">خصوصي 4 سلندر</option>
          <option value="خصوصي_6">خصوصي 6 سلندر</option>
          <option value="خصوصي_8">خصوصي 8 سلندر</option>
          <option value="أجرة_4">أجرة 4 سلندر</option>
          <option value="أجرة_6">أجرة 6 سلندر</option>
          <option value="أجرة_8">أجرة 8 سلندر</option>
          <option value="حمل_خاص">الحمل نقل خاص</option>
          <option value="حمل_عام">الحمل نقل عام</option>
          <option value="باص_7_12">باص 7–12 راكب</option>
          <option value="باص_12_24">باص 12–24 راكب</option>
          <option value="باص_25">باص 25 راكب فأكثر</option>
        </select>
      </label>
      <label>سعر المركبة (IQD)
        <input id="price" type="number" min="0" step="1" placeholder="مثال: 10000000" required />
      </label>
      <label>إضافة تغطية الإرهاب؟
        <select id="terror">
          <option value="no">لا</option>
          <option value="yes">نعم</option>
        </select>
      </label>
      <button class="cta" type="submit">احسب القسط</button>
    </form>
    <div id="res" style="margin-top:8px"></div>
  `;

  const rates = {
    "خصوصي_4": {risk:2.975, liab:0.525, terror:1.2},
    "خصوصي_6": {risk:3.1875, liab:0.5625, terror:1.4},
    "خصوصي_8": {risk:3.4, liab:0.6, terror:1.6},
    "أجرة_4": {risk:3.6125, liab:0.6375, terror:1.6},
    "أجرة_6": {risk:4.675, liab:0.825, terror:1.8},
    "أجرة_8": {risk:5.525, liab:0.975, terror:2.0},
    "حمل_خاص": {risk:3.2, liab:0.8, terror:1.7},
    "حمل_عام": {risk:4.0, liab:1.0, terror:2.0},
    "باص_7_12": {risk:5.2, liab:1.3, terror:2.2},
    "باص_12_24": {risk:5.6, liab:1.4, terror:2.4},
    "باص_25": {risk:6.0, liab:1.5, terror:2.5},
  };

  function fmt(n){ return new Intl.NumberFormat('ar-IQ').format(Math.round(n)); }

  root.querySelector('#quick-calc').addEventListener('submit', (e)=>{
    e.preventDefault();
    const cat = root.querySelector('#cat').value;
    const price = Number(root.querySelector('#price').value||0);
    const addTerror = root.querySelector('#terror').value === 'yes';
    const r = rates[cat];
    if (!r || !price){ return; }

    const risk = (price * (r.risk/100));
    const liab = (price * (r.liab/100));
    const base = risk + liab;
    let terror = 0;
    if (addTerror){
      terror = ((price/2) * (r.terror/100));
    }
    const total = base + terror;

    root.querySelector('#res').innerHTML = `
      <div class="features" style="grid-template-columns:1fr 1fr 1fr;">
        <div><strong>قسط الخطر:</strong><br>${fmt(risk)} IQD</div>
        <div><strong>المسؤولية المدنية:</strong><br>${fmt(liab)} IQD</div>
        <div><strong>الإرهاب:</strong><br>${fmt(terror)} IQD</div>
      </div>
      <p><strong>الإجمالي التقديري:</strong> ${fmt(total)} IQD</p>
      <a class="form-card" href="forms/auto_premium.html">طلب تسعير/وثيقة سيارات (تفصيلي)</a>
    `;
  });
};
