import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  	plugins: [react()],
	build: {
		outDir: './build',
		emptyOutDir: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						const librariesToKeepTogether = ['react', 'react-dom', 'react-transition-group', '@emotion', '@mui', 'mui', 'zustand', 'its-fine'];
						const packageName = id.toString().split('node_modules/')[1].split('/')[0].toString();
						if (librariesToKeepTogether.some(lib => packageName.includes(lib))) {
							return 'react-vendor';
						}
						return packageName;
					}
				}
			}
		}
	}
})
