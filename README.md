# mongoose-Bogado-Daiana

Este proyecto es el backend del sistema de biblioteca que desarrollé con MongoDB y Mongoose.

### Justificación del Modelo de Datos

- **Uso de campos embebidos:** Usé embebido cuando el documento es necesario únicamente si existe el documento padre. Como en la situación de la dirección en el documento del cliente, ya que no tiene sentido consultarla por separado.
- **Uso de referencias:** Usé referencia cuando son colecciones diferentes, pero quiero mostrar la información de otra al hacer una consulta (usando `populate`). También es la base para manejar las relaciones 1:N y N:M entre mis entidades.
- **Eliminación lógica:** Implementé un campo `activate` en lugar de borrar los documentos físicamente, para no romper el historial de relaciones (como los préstamos) si un elemento se da de baja.