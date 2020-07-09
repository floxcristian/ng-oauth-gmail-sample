import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  private sameDay(date): boolean {
    date = new Date();
    let now = new Date();
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  }

  transform(time: string): string {
    const secondsAgo = Math.floor((+new Date() - +new Date(time)) / 1000);

    // Ha pasado mas de una semana
    let interval = Math.floor(secondsAgo / (60 * 60 * 24 * 7));
    if (interval >= 1) {
      let res = new Date(time).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      res = res.replace(/\sde\s/g, ' ');
      let values = res.split(' ');
      return `${values[0]} ${values[1].substring(0, 3)} ${values[2]} ${
        values[3]
      }.`;
    }

    // Ha pasado mas de un día
    // Si es en el mismo dìa
    interval = Math.floor(secondsAgo / (60 * 60 * 24));
    if (interval >= 1) {
      let res = new Date(time).toLocaleString('es-CL', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
      return res.replace(/\./g, '');
    }

    // Ha pasado más de una hora
    interval = Math.floor(secondsAgo / (60 * 60));
    if (interval >= 1) {
      return `${interval} ${interval == 1 ? 'hora' : 'horas'} atrás.`;
    }

    // Ha pasado más de un minuto
    interval = Math.floor(secondsAgo / 60);
    if (interval >= 1) return `${interval} minutos atrás.`;

    return Math.floor(secondsAgo) + ' segundos atrás';
  }
}
