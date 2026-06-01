import { motion } from 'framer-motion';
import { PackageSearch, SearchX, Star, RotateCcw } from 'lucide-react';

const EmptyState = ({ mode, reposExist, hasActiveFilters, onResetFilters }) => {
  const isReaper = mode === 'reaper';

  const getContent = () => {
    if (!reposExist) {
      return {
        icon: isReaper ? <PackageSearch className="w-20 h-20 text-blue-500/40" /> : <Star className="w-20 h-20 text-yellow-500/40" />,
        title: isReaper ? 'No repositories yet' : 'No starred repositories yet',
        message: isReaper
          ? 'Your GitHub account doesn\'t have any repositories to manage.'
          : 'You haven\'t starred any repositories yet. Start exploring and starring repos you like!',
        showReset: false,
      };
    }
    return {
      icon: <SearchX className={`w-20 h-20 ${isReaper ? 'text-blue-500/40' : 'text-yellow-500/40'}`} />,
      title: isReaper ? 'No repositories found' : 'No starred repositories found',
      message: 'Try adjusting your search, filters, or check the forked/private toggles above.',
      showReset: hasActiveFilters,
    };
  };

  const { icon, title, message, showReset } = getContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        {icon}
      </motion.div>

      <h2 className={`text-2xl font-bold mt-6 ${isReaper ? 'text-blue-100' : 'text-yellow-100'}`}>
        {title}
      </h2>

      <p className="text-gray-400 mt-3 max-w-md text-base">
        {message}
      </p>

      {showReset && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={onResetFilters}
          className={`mt-8 px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            isReaper
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-700/30'
              : 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-700/30'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
