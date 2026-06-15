const currencyDeals = [
  { name: 'USD / IRR', buy: '720,000', sell: '725,000' },
  { name: 'EUR / IRR', buy: '780,000', sell: '786,000' },
  { name: 'CAD / IRR', buy: '530,000', sell: '536,000' },
  { name: 'AED / IRR', buy: '196,000', sell: '198,000' }
];

const goldDeals = [
  { name: 'طلای ۱۸ عیار', buy: '64,500,000', sell: '65,200,000' },
  { name: 'سکه امامی', buy: '745,000,000', sell: '752,000,000' },
  { name: 'نیم سکه', buy: '405,000,000', sell: '411,000,000' },
  { name: 'شمش یک گرمی', buy: '68,000,000', sell: '69,100,000' }
];

const dealPanel = document.getElementById('dealPanel');
const dealTitle = document.getElementById('dealTitle');
const dealSubtitle = document.getElementById('dealSubtitle');
const dealList = document.getElementById('dealList');
const closeDeal = document.getElementById('closeDeal');
const toast = document.getElementById('toast');

function getDeals(type) {
  return type === 'gold' ? goldDeals : currencyDeals;
}

function openDeals(type) {
  const isGold = type === 'gold';
  dealTitle.textContent = isGold ? 'معامله طلا' : 'معامله ارز';
  dealSubtitle.textContent = isGold
    ? 'لیست خرید و فروش طلا با قیمت لحظه‌ای'
    : 'لیست خرید و فروش جفت ارزها با قیمت لحظه‌ای';

  dealList.innerHTML = getDeals(type).map(item => `
    <article class="deal-card">
      <div class="deal-top">
        <span class="deal-name">${item.name}</span>
        <span class="live-badge">LIVE</span>
      </div>
      <div class="price-grid">
        <div class="price-box"><span>قیمت خرید</span><b>${item.buy}</b></div>
        <div class="price-box"><span>قیمت فروش</span><b>${item.sell}</b></div>
      </div>
      <div class="deal-actions">
        <button class="trade-btn buy-btn" data-action="buy" data-name="${item.name}">خرید</button>
        <button class="trade-btn sell-btn" data-action="sell" data-name="${item.name}">فروش</button>
      </div>
    </article>
  `).join('');

  dealPanel.classList.add('show');
  dealPanel.setAttribute('aria-hidden', 'false');
}

function closeDeals() {
  dealPanel.classList.remove('show');
  dealPanel.setAttribute('aria-hidden', 'true');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function doTrade(button) {
  const action = button.dataset.action;
  const name = button.dataset.name;
  const actionText = action === 'buy' ? 'خرید' : 'فروش';
  const oldText = button.textContent;

  button.classList.add('loading');
  button.textContent = 'در حال انجام...';
  showToast(`${actionText} ${name} در حال انجام است...`);

  setTimeout(() => {
    button.classList.remove('loading');
    button.textContent = oldText;
    showToast(`${actionText} ${name} با موفقیت انجام شد`);
  }, 1700);
}

document.querySelectorAll('.deal-open').forEach(button => {
  button.addEventListener('click', () => openDeals(button.dataset.type));
});

closeDeal.addEventListener('click', closeDeals);

dealPanel.addEventListener('click', event => {
  if (event.target === dealPanel) closeDeals();
});

dealList.addEventListener('click', event => {
  const button = event.target.closest('.trade-btn');
  if (button) doTrade(button);
});
