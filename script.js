/* Accessible mobile navigation; links stay available when JavaScript is disabled. */
(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  if (!header || !toggle || !navigation) return;
  header.classList.add('nav-enhanced');
  toggle.hidden = false;
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  window.matchMedia('(max-width: 850px)').addEventListener('change', () => setOpen(false));
})();

(() => {
    const form = document.querySelector('#beta-signup');
    const status = document.querySelector('#beta-signup-status');

    if (!form || !status) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const button = form.querySelector('button');
        button.disabled = true;
        button.textContent = 'Joining...';

        try {
            const response = await fetch(
                'https://formsubmit.co/ajax/turtletechlab@outlook.com',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(
                        Object.fromEntries(new FormData(form))
                    )
                }
            );

            const result = await response.json();

            if (!response.ok || result.success === 'false') {
                throw new Error('Submission failed');
            }

            status.textContent = 'Thank you for joining!';
            form.reset();
        } catch (error) {
            status.textContent = 'Unable to submit. Please try again.';
        } finally {
            button.disabled = false;
            button.textContent = 'Be a Beta Tester';
        }
    });
})();
