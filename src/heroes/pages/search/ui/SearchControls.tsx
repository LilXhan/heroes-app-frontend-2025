import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, SortAsc, Grid, Plus } from 'lucide-react';
import { useRef, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SearchControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeAccordion = searchParams.get('active-accordion') ?? '';
  const selectedStrength = Number(searchParams.get('strength') ?? '1');

  const setQueryParams = (name: string, value: string) => {
    setSearchParams(prev => {
      prev.set(name, value);
      return prev;
    });
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQueryParams('name', inputRef.current?.value ?? '');
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input defaultValue={searchParams.get('name') ?? ''} onKeyDown={handleKeyDown} ref={inputRef} placeholder="Search heroes, villains, powers, teams..." className="pl-12 h-12 text-lg" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button onClick={() => {
            if (activeAccordion === 'advance-filters') {
              setSearchParams(prev => {
                prev.delete('active-accordion');
                return prev;
              })
              // setQueryParams('active-accordion', '')
              return;
            }
            setQueryParams('active-accordion', 'advance-filters')
          }} variant={activeAccordion === 'advance-filters' ? 'default' : 'outline'} className="h-12">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" className="h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort by Name
          </Button>

          <Button variant="outline" className="h-12">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Character
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <Accordion type="single" collapsible value={activeAccordion}>
        <AccordionItem value="advance-filters">
          {/* <AccordionTrigger>Is it accessible?</AccordionTrigger> */}
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button onClick={() => {
                  setSearchParams(prev => {
                    prev.delete('category');
                    prev.delete('universe');
                    prev.delete('status');
                    return prev;
                  })
                }} variant="ghost">Clear All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select onValueChange={value => {
                    if (value === 'all') {
                      setSearchParams(prev => {
                        prev.delete('category');
                        return prev;
                      })
                      return;
                    }
                    setQueryParams('category', value);
                  }} value={searchParams.get('category') ?? 'all'} defaultValue={searchParams.get('category') ?? ''}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="hero">Heroes</SelectItem>
                      <SelectItem value="villain">Villains</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">Team</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Universe</label>
                  <Select onValueChange={value => {
                    if (value === 'all') {
                      setSearchParams(prev => {
                        prev.delete('universe');
                        return prev;
                      })
                      return;
                    }
                    setQueryParams('universe', value);
                  }} value={searchParams.get('universe') ?? 'all'} defaultValue={searchParams.get('universe') ?? ''}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chose a universe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="dc">DC</SelectItem>
                      <SelectItem value="marvel">Marvel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select onValueChange={value => {
                    if (value === 'all') {
                      setSearchParams(prev => {
                        prev.delete('status');
                        return prev;
                      })
                      return;
                    }
                    setQueryParams('status', value);
                  }} value={searchParams.get('status') ?? 'all'} defaultValue={searchParams.get('status') ?? ''}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chose a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
                <Slider onValueChange={value => setQueryParams('strength', value[0].toString())} defaultValue={[selectedStrength]} min={1} max={10} step={1} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion >

    </>


  )
}
