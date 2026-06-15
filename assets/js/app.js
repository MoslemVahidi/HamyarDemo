const currencyDeals = [
  { name: 'USD / IRR', buy: '720,000', sell: '725,000', unit: 'دلار' },
  { name: 'EUR / IRR', buy: '780,000', sell: '786,000', unit: 'یورو' },
  { name: 'CAD / IRR', buy: '530,000', sell: '536,000', unit: 'دلار کانادا' },
  { name: 'AED / IRR', buy: '196,000', sell: '198,000', unit: 'درهم' }
];

const goldDeals = [
  { name: 'طلای ۱۸ عیار', buy: '64,500,000', sell: '65,200,000', unit: 'گرم' },
  { name: 'سکه امامی', buy: '745,000,000', sell: '752,000,000', unit: 'عدد' },
  { name: 'نیم سکه', buy: '405,000,000', sell: '411,000,000', unit: 'عدد' },
  { name: 'شمش یک گرمی', buy: '68,000,000', sell: '69,100,000', unit: 'عدد' }
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
  dealSubtitle.textContent = isGold ? 'مقدار را وارد کن و خرید/فروش را بزن' : 'مقدار ارز را وارد کن و خرید/فروش را بزن';

  dealList.innerHTML = getDeals(type).map((item, index) => `
    <article class="deal-row">
      <div class="deal-main">
        <div class="deal-name">${item.name}</div>
        <div class="deal-prices">
          <span>خرید: <b>${item.buy}</b></span>
          <span>فروش: <b>${item.sell}</b></span>
        </div>
      </div>
      <div class="deal-trade">
        <div class="amount-box">
          <input class="amount-input" id="amount-${type}-${index}" type="number" min="0" step="0.01" inputmode="decimal" placeholder="مقدار" />
          <span>${item.unit}</span>
        </div>
        <div class="deal-actions">
          <button class="trade-btn buy-btn" data-action="buy" data-name="${item.name}" data-input="amount-${type}-${index}">خرید</button>
          <button class="trade-btn sell-btn" data-action="sell" data-name="${item.name}" data-input="amount-${type}-${index}">فروش</button>
        </div>
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
  const input = document.getElementById(button.dataset.input);
  const amount = input ? input.value.trim() : '';
  const actionText = action === 'buy' ? 'خرید' : 'فروش';
  const oldText = button.textContent;

  if (!amount || Number(amount) <= 0) {
    showToast('اول مقدار معامله را وارد کن');
    if (input) input.focus();
    return;
  }

  button.classList.add('loading');
  button.textContent = '...';
  showToast(`${actionText} ${amount} از ${name} در حال انجام است...`);

  setTimeout(() => {
    button.classList.remove('loading');
    button.textContent = oldText;
    showToast(`${actionText} ${amount} از ${name} انجام شد`);
  }, 1500);
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
