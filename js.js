const PHONE_NUMBER = "5491125159506"; 

        let cart = [];

        function toggleCart() {
            const modal = document.getElementById('cart-modal');
            modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
        }

        function addToCart(title, price) {
            const existingItem = cart.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ title, price, quantity: 1 });
            }
            updateCart();
            toggleCart(); // Abre el carrito al agregar
        }

        function removeFromCart(title) {
            cart = cart.filter(item => item.title !== title);
            updateCart();
        }

        function updateCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartCount = document.getElementById('cart-count');
            const cartTotal = document.getElementById('cart-total');

            cartItemsContainer.innerHTML = '';
            let total = 0;
            let totalCount = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888;">El carrito está vacío.</p>';
            } else {
                cart.forEach(item => {
                    total += item.price * item.quantity;
                    totalCount += item.quantity;

                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');
                    itemElement.innerHTML = `
                        <div class="cart-item-info">
                            <h4>${item.title}</h4>
                            <p>${item.quantity} x $${item.price.toLocaleString()}</p>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.title}')">Eliminar</button>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                });
            }

            cartCount.textContent = totalCount;
            cartTotal.textContent = `$${total.toLocaleString()}`;
        }

        function sendWhatsApp() {
            if (cart.length === 0) {
                alert("Tu carrito está vacío. Agrega algún producto antes de comprar.");
                return;
            }

            let message = "¡Hola! Quisiera realizar el siguiente pedido:\n\n";
            let total = 0;

            cart.forEach(item => {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                message += `• ${item.title} x${item.quantity} - $${subtotal.toLocaleString()}\n`;
            });

            message += `\n*Total a pagar: $${total.toLocaleString()}*`;
            message += "\n\n¿Me podrías indicar los pasos para completar el pago y envío?";

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        }

        // Actualizar el link de contacto del header
        document.getElementById('contact-link').href = `https://wa.me/${PHONE_NUMBER}`;