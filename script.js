
  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("people");
    const sliderValue = document.getElementById("sliderValue");
    const sizeRadios = document.querySelectorAll("input[name='size']");
    const expressCheckbox = document.getElementById("express"); // pokud checkbox existuje
    const oldPriceDisplay = document.getElementById("oldPrice");
    const newPriceDisplay = document.getElementById("Price");
    const newPriceBottomDisplay = document.getElementById("PriceBottom"); // 💬 přidaný řádek pro dolní cenu
    const oldPriceBottomDisplay = document.getElementById("oldPriceBottom");

  
    const BASE_PRICE = 1249;
    const EXTRA_PER_PERSON = 350;
    const SIZE_EXTRA_PRICE = {
      "30x40": 0,
      "50x70": 300
    };
    const EXPRESS_PRICE = 540;
    const DISCOUNT = 0.20;
  
    function updatePrice() {
        const peopleCount = parseInt(slider.value);
        const extraPeople = Math.max(0, peopleCount - 1);
        const sizeRadio = [...sizeRadios].find(r => r.checked);
        const selectedSize = sizeRadio ? sizeRadio.value : "30x40";
        const sizeExtra = SIZE_EXTRA_PRICE[selectedSize] || 0;
        const expressExtra = expressCheckbox && expressCheckbox.checked ? EXPRESS_PRICE : 0;
      
        // 💡 Nová logika: sleva platí jen na základ + osoby navíc
        const discountablePart = BASE_PRICE + (extraPeople * EXTRA_PER_PERSON); // část se slevou
        const discounted = Math.round(discountablePart * (1 - DISCOUNT)); // sleva jen na tuto část
      
        // 💡 Konečná cena = (zlevněná část) + příplatky bez slevy
        const total = discounted + sizeExtra + expressExtra;
      
        sliderValue.textContent = slider.value;
      
        // Zobrazit původní a novou cenu
        oldPriceDisplay.textContent = (discountablePart + sizeExtra + expressExtra).toLocaleString('cs-CZ') + " Kč";
newPriceDisplay.textContent = total.toLocaleString('cs-CZ') + " Kč";

if (oldPriceBottomDisplay) {
  oldPriceBottomDisplay.textContent = (discountablePart + sizeExtra + expressExtra).toLocaleString('cs-CZ') + " Kč";
}
if (newPriceBottomDisplay) {
  newPriceBottomDisplay.textContent = total.toLocaleString('cs-CZ') + " Kč";
}

      }
  
    slider.addEventListener("input", () => {
      sliderValue.textContent = slider.value;
      updatePrice();
    });
  
    sizeRadios.forEach(radio => radio.addEventListener("change", updatePrice));
    if (expressCheckbox) expressCheckbox.addEventListener("change", updatePrice);
  
    updatePrice();
  });
  




  // Supabase URL a klíč (veřejný - role: anon)
const supabaseUrl = 'https://wuodpebubpcjalncgzqh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1b2RwZWJ1YnBjamFsbmNnenFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTQ5NzAsImV4cCI6MjA2MzQ3MDk3MH0.Ffm_oROf0O6GIHu_Q1GfNf4reK7WvAtHjLn0v4xRFIQ';

// Vytvoření klienta
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



// Testovací dotaz na existující tabulku
(async () => {
  const { data, error } = await supabase
    .from('MP Landing page Sims sofa') // přesný název tabulky
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Chyba při připojení k Supabase:', error.message);
  } else {
    console.log('✅ Spojení navázáno. Data:', data);
  }
})();



// Odeslání formuláře
document.getElementById("karikaturaForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;

  const data = {
    first_name: form.firstName.value,
    last_name: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    zip: form.ZIP.value,
    people_count: parseInt(document.getElementById("people").value),
    size: form.size.value,
    express: form.express.checked,
    notes: form.notes.value,
    created_at: new Date().toISOString() // doporučeno
  };

  const { error } = await supabase
    .from('MP Landing page Sims sofa') // název tabulky v Supabase
    .insert([data]);

  if (error) {
    console.error("❌ Chyba při odesílání:", error.message);
    alert("Objednávku se nepodařilo odeslat. Zkuste to prosím znovu.");
  } else {
    alert("✅ Objednávka byla úspěšně odeslána! Brzy se vám ozveme.");
    form.reset();
  }
});
