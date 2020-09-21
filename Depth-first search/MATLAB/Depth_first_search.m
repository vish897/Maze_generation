clear; clc; close all;

% Number of rows & columns
rows      = 50;
cols      = 50;

%  Creating arena
gr        = 2*rows+1;
gc        = 2*cols+1;
grid      = ones(gr,gc);

% Setting the arena
grid(gr+2)   = 0;
current      = gr+2;
visited      = current;
lens         = length(visited);

figure()
xlim([0 gr+1])
ylim([0 gc+1])
flg=1;

while lens>=1
    pause(0.005);
    fgrid           = binaryOccupancyMap(grid);
    show(fgrid)
    lens            = length(visited);
    [next,flg] = find_neighbour(current,grid,gr,gc);
    lens = length(visited);
    if(flg==1)
        grid        = remove_walls(grid,current,next,gr);
        current     = next;
        visited     = cat(2,visited,current);
        disp('flg1')
    elseif(lens>=1)
        visited(end)  = [];
        current       = visited(end);
        disp('flg0')
    end
end


%% Remove walls between two elements
function grido = remove_walls(gridi,current,next,gr)
    colc  = fix(current/gr) + 1;
    rowc  = current - (colc-1)*gr;
    
    coln  = fix(next/gr) + 1;
    rown  = next - (coln-1)*gr;
    if(rowc-rown==2)
        gridi([rown rown+1],colc) = 0;
    elseif(rowc-rown==-2)
        gridi([rown rown-1],colc) = 0;
    elseif(colc-coln==2)
        gridi(rown,[coln coln+1]) = 0;
    elseif(colc-coln==-2)
        gridi(rown,[coln coln-1]) = 0;
    end  
    
    grido = gridi;
end

%% Finding next neighbour
function [next,flag,l] = find_neighbour(current,grid,gr,gc)
    colc  = fix(current/gr) + 1;
    rowc  = current - (colc-1)*gr;
    rowp  = [rowc-2 rowc rowc+2 rowc];
    colp  = [colc colc+2 colc colc-2];
    nextp = zeros(1,4);
    
    for i=1:4
        if(colp(i) > gc-1 || colp(i) < 2 || rowp(i) > gr-1 || rowp(i) < 2)
            colp(i) = 0;
            rowp(i) = 0;
        end
        nextp(i)  = ((colp(i)-1)*gr) + rowp(i);
    end

    nextp(nextp<=0) = [];
    l = length(nextp);
    
    for i=1:l
        if grid(nextp(i))==0
            nextp(i)=0;
        end
    end
    
    nextp(nextp==0) = [];
    l = length(nextp);
    
    if(l==0)
        flag  = 0;
        next  = current;
    else
        ind  = randi(l);
        next = nextp(ind);
        flag = 1;
    end
end