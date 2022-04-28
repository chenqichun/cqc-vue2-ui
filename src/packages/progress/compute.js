
export default {
  computed: {
    relativeStrokeWidth() {
      return (this.strokeWidth / this.width * 100).toFixed(1);
    },
    radiu() {
      if (this.type === 'circle' || this.type === 'dashboard') {
        return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
      } else {
        return 0;
      }
    },
    trackPath() {
      const _radius = this.radiu;
      const isDashboard = this.type === 'dashboard';
      return `
        M 50 50
        m 0 ${isDashboard ? '' : '-'}${_radius}
        a ${_radius} ${_radius} 0 1 1 0 ${isDashboard ? '-' : ''}${_radius * 2}
        a ${_radius} ${_radius} 0 1 1 0 ${isDashboard ? '' : '-'}${_radius * 2}
        `;
      },
      perimeter() {
        return 2 * Math.PI * this.radiu;
      },
      rate() {
        return this.type === 'dashboard' ? 0.75 : 1;
      },
      strokeDashoffset() {
        const offset = -1 * this.perimeter * (1 - this.rate) / 2;
        return `${offset}px`;
      },
      trailPathStyle() {
        return {
          strokeDasharray: `${(this.perimeter * this.rate)}px, ${this.perimeter}px`,
          strokeDashoffset: this.strokeDashoffset
        };
      },
      circlePathStyle() {
        let percentage = this.percentage;
        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;
        return {
          strokeDasharray: `${this.perimeter * this.rate * (percentage / 100)}px, ${this.perimeter}px`,
          strokeDashoffset: this.strokeDashoffset,
          transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
        };
      }
  }
}