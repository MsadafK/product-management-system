import { Grid, List} from 'lucide-react';

const ViewToggle = ({ view, onToggle }) => {
  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-xl shadow-sm">
      <button
        onClick={() => onToggle('grid')}
        className={`p-2.5 rounded-lg transition-all cursor-pointer ${view === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
      >
        <Grid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onToggle('list')}
        className={`p-2.5 rounded-lg transition-all cursor-pointer ${view === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ViewToggle;